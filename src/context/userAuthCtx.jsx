import { createContext, useState, useEffect } from "react";
import { supabase } from "../api/supabase";

const defaultUserAuth = {
  email: "",
  password: "",
  confirmPassword: "",
};

const UserAuthCtx = createContext(null);

const UserAuthProvider = (props) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAuth, setUserAuth] = useState(defaultUserAuth);
  const [error, setError] = useState("");
  const [authMode, setAuthMode] = useState("signin");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
          setUser(session.user);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    checkUser();
  }, [setUser, setIsAuthenticated]);

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setUserAuth((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (userAuth.password !== userAuth.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (userAuth.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: userAuth.email,
        password: userAuth.password,
      });

      if (error) throw error;

      if (data.user) {
        if (data.user.identities?.length === 0) {
          setError("This email is already registered. Please sign in.");
        } else {
          setError("Check your email for the confirmation link!");
          setIsAuthOpen(false);
        }
      }
    } catch (error) {
      console.error("Sign up error:", error);
      setError(error.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userAuth.email,
        password: userAuth.password,
      });

      if (error) throw error;

      if (data.user) {
        setIsAuthenticated(true);
        setUser(data.user);
        setIsAuthOpen(false);
        setUserAuth(defaultUserAuth);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSubmit = (e) => {
    if (authMode === "signup") {
      handleSignUp(e);
    } else {
      handleSignIn(e);
    }
  };

  const handleAuthOpen = (mode = "signin") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
    setError("");
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
        return;
      }
      setIsAuthenticated(false);
      setUserAuth(defaultUserAuth);
      setUser(null);
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode((prev) => (prev === "signin" ? "signup" : "signin"));
    setError("");
  };

  const value = {
    isAuthOpen,
    setIsAuthOpen,
    isAuthenticated,
    setIsAuthenticated,
    handleAuthOpen,
    handleAuthSubmit,
    handleSignOut,
    error,
    userAuth,
    handleAuthChange,
    authMode,
    toggleAuthMode,
    loading,
    user,
  };

  return (
    <UserAuthCtx.Provider value={value}>{props.children}</UserAuthCtx.Provider>
  );
};

export { UserAuthCtx, UserAuthProvider };
