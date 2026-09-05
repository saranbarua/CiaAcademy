// src/context/TraineeAuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import {
  loginTrainee,
  registerTrainee,
  fetchMyProfile,
  TraineeSummary,
  TraineeProfile,
  TraineeRegisterPayload,
} from "../data/api/traineeApi";

interface TraineeAuthContextValue {
  trainee: TraineeSummary | null;
  profile: TraineeProfile | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: TraineeRegisterPayload) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const TraineeAuthContext = createContext<TraineeAuthContextValue | undefined>(
  undefined,
);

export const TraineeAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [trainee, setTrainee] = useState<TraineeSummary | null>(() => {
    const name = Cookies.get("traineeName");
    const email = Cookies.get("traineeEmail");
    const id = Cookies.get("traineeId");
    if (Cookies.get("traineeToken") && name && email) {
      return { id: Number(id) || 0, name, email, phone: "" };
    }
    return null;
  });
  const [profile, setProfile] = useState<TraineeProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const persistSession = (token: string, t: TraineeSummary) => {
    Cookies.set("traineeToken", token, { expires: 7 });
    Cookies.set("traineeName", t.name, { expires: 7 });
    Cookies.set("traineeEmail", t.email, { expires: 7 });
    Cookies.set("traineeId", String(t.id), { expires: 7 });
    setTrainee(t);
  };

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginTrainee(email, password);
      persistSession(data.token, data.trainee);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async (payload: TraineeRegisterPayload) => {
      setLoading(true);
      try {
        await registerTrainee(payload);
        // Registration doesn't return a token, so log in right after
        await login(payload.email, payload.password);
      } finally {
        setLoading(false);
      }
    },
    [login],
  );

  const logout = useCallback(() => {
    Cookies.remove("traineeToken");
    Cookies.remove("traineeName");
    Cookies.remove("traineeEmail");
    Cookies.remove("traineeId");
    setTrainee(null);
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!Cookies.get("traineeToken")) return;
    setLoading(true);
    try {
      const data = await fetchMyProfile();
      setProfile(data);
    } catch {
      // token invalid/expired \u2014 fetchMyProfile already clears cookies
      setTrainee(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (trainee) refreshProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TraineeAuthContext.Provider
      value={{
        trainee,
        profile,
        isLoggedIn: !!trainee,
        loading,
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </TraineeAuthContext.Provider>
  );
};

export function useTraineeAuth() {
  const ctx = useContext(TraineeAuthContext);
  if (!ctx)
    throw new Error("useTraineeAuth must be used within TraineeAuthProvider");
  return ctx;
}
