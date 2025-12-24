import { motion, AnimatePresence } from "motion/react";
import AuthForm from "./authForm";
import { useAuth } from "../../hooks/useAuth";

const Auth = () => {
  const { isAuthOpen, setIsAuthOpen, authMode, toggleAuthMode } = useAuth();

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <section
          className="fixed inset-0 bg-transparent z-10 flex justify-end"
          onClick={() => setIsAuthOpen(false)}
        >
          <motion.div
            className="min-w-sm h-screen px-8 py-12 bg-white shadow-[3px_0_8px_rgba(41,37,36,0.2)]"
            initial={{ opacity: 0, x: 500 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 500 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <AuthForm />
            <div className="w-full h-auto flex justify-center mt-4">
              <p className="text-sm text-stone-600">
                {authMode === "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  type="button"
                  className="text-blue-500 ml-1 hover:cursor-pointer"
                  onClick={toggleAuthMode}
                >
                  {authMode === "signin" ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </motion.div>
        </section>
      )}
    </AnimatePresence>
  );
};

export default Auth;
