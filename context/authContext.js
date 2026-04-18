import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [state, setState] = useState({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Fetch profile from DB
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.log("Profile fetch error:", error.message);
        return null;
      }
      setProfile(data);
      return data;
    } catch (err) {
      console.log("Unexpected profile fetch error:", err.message);
      return null;
    }
  };

  // Update profile for current user
  const updateProfile = async (updates) => {
    if (!state.user) throw new Error("No user logged in");

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", state.user.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      return { data, error: null };
    } catch (error) {
      console.error("Update profile error:", error);
      return { data: null, error };
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // Refresh current profile
  const refreshProfile = async () => {
    if (state.user) {
      await fetchProfile(state.user.id);
    }
  };

  // Load session and profile on mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.log("Session error:", error.message);
        }

        const session = data?.session;

        setState({
          session,
          user: session?.user || null,
          isAuthenticated: !!session,
          isLoading: false,
        });

        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (err) {
        console.log("Init error:", err.message);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initializeApp();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setState({
        session,
        user: session?.user || null,
        isAuthenticated: !!session,
        isLoading: false,
      });

      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sign in
  const signIn = async ({ email, password }) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setState((prev) => ({ ...prev, isLoading: false }));

    if (error) throw error;

    // Profile will be fetched by onAuthStateChange
    return data;
  };

  // Sign up
  const signUp = async ({ email, password, fullName }) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username: email.split("@")[0],
          },
        },
      });

      if (error) throw error;

      return data;
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  // Password reset
  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "plugu://reset-password",
    });

    if (error) throw error;
  };

  const updatePassword = async (password) => {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) throw error;
  };

  const refreshSession = async () => {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) throw error;

    const session = data.session;

    setState((prev) => ({
      ...prev,
      session,
      user: session?.user || null,
      isAuthenticated: !!session,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        refreshSession,
        profile,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;