// src/components/auth/ProtectedTraineeRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTraineeAuth } from "./TraineeAuthContext";

export const ProtectedTraineeRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoggedIn } = useTraineeAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};
