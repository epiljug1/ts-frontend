import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { currentUser } from "../service/user.service";

export const useAuth = () => {
  const context = useAuthContext();
  const [authState, setAuthState] = useState({
    isLoading: !context.user,
    isAuthenticated: !!context.user,
  });

  useEffect(() => {
    async function get() {
      const { data } = await currentUser();
      if (data.user || data.email) {
        context.login(data);
      }
      setAuthState({
        isLoading: false,
        isAuthenticated: !!(data.user || data.email),
      });
    }
    if (!authState.isAuthenticated) {
      get();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return authState;
};
