import { createContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import toast from "react-hot-toast";
import { redirect } from "react-router";

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
  const [loading, setLoading] = useState(true);
  const [loadingType, setLoadingType] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);

      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          await supabase.auth.signOut();
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        if (session) {
          setIsAuthenticated(true);
          setUser(session.user);
          const params = new URLSearchParams(window.location.search);
          if (
            params.get("type") === "recovery" ||
            window.location.hash.includes("access_token")
          ) {
            toast.success("Successfully signed in");
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        await supabase.auth.signOut();
        setError(error.message);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          setIsAuthenticated(true);
          setUser(session?.user || null);
          setIsAuthOpen(false);
          setUserAuth(defaultUserAuth);
          setError("");
        } else if (event === "INITIAL_SESSION") {
          if (session && session.user) {
            setIsAuthenticated(true);
            setUser(session.user);
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } else if (event === "SIGNED_OUT") {
          setIsAuthenticated(false);
          setUser(null);
          setError("");
        } else if (event === "TOKEN_REFRESHED") {
          setUser(session?.user || null);
          setIsAuthenticated(true);
        } else if (event === "USER_UPDATED") {
          setUser(session?.user || null);
        }

        if (event === "TOKEN_REFRESHED_FAILED") {
          toast.error("Your session has expired. Please sign in again.");
          await supabase.auth.signOut();
          setIsAuthenticated(false);
          setUser(null);
          setIsAuthOpen(true);
        }
      },
    );

    return () => authListener?.subscription?.unsubscribe();
  }, []);

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
    setLoadingType("credentials");

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
          toast.success("Check your email for the confirmation link!");
          setIsAuthOpen(false);
          setUserAuth(defaultUserAuth);
        }
      }
    } catch (error) {
      console.error("Sign up error:", error);
      setError(error.message || "Failed to sign up");
    } finally {
      setLoading(false);
      setLoadingType(null);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setLoadingType("credentials");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userAuth.email,
        password: userAuth.password,
      });

      if (error) throw error;

      if (data.user) {
        setIsAuthOpen(false);
        setUserAuth(defaultUserAuth);
        toast.success("Successfully signed in!");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
      setLoadingType(null);
    }
  };

  const handleSignInWithOAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setLoadingType("google");

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        console.error("OAuth sign-in error:", error);
        throw error;
      }

      if (data.provider) {
        setIsAuthOpen(false);
        setUserAuth(defaultUserAuth);
      }
    } catch (error) {
      console.error("Unexpected sign-in error:", error);
      setError(error.message || "Failed to sign in with OAuth");
    } finally {
      setLoading(false);
      setLoadingType(null);
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
    setUserAuth(defaultUserAuth);
  };

  const handleSignOut = async () => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
        return;
      }

      setIsAuthOpen(false);
      toast.success("Successfully signed out");
      return redirect("/");
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode((prev) => (prev === "signin" ? "signup" : "signin"));
    setError("");
    setUserAuth(defaultUserAuth);
  };

  const value = {
    isAuthOpen,
    setIsAuthOpen,
    isAuthenticated,
    setIsAuthenticated,
    handleAuthOpen,
    handleAuthSubmit,
    handleSignOut,
    handleSignInWithOAuth,
    error,
    userAuth,
    handleAuthChange,
    authMode,
    toggleAuthMode,
    loading,
    loadingType,
    user,
  };

  return (
    <UserAuthCtx.Provider value={value}>{props.children}</UserAuthCtx.Provider>
  );
};

export { UserAuthCtx, UserAuthProvider };
