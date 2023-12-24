import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { currentUser } from "../service/user.service";
import { api } from "../api/api.instance";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const navigate = useNavigate();
  const context = useAuthContext();
  const [authState, setAuthState] = useState({
    isLoading: !context.user,
    isAuthenticated: !!context.user,
  });

  useEffect(() => {
    async function get() {
      try {
        const { data } = await currentUser();
        if (data.user || data.email) {
          context.login(data);
        }

        setAuthState({
          isLoading: false,
          isAuthenticated: !!(data.user || data.email),
        });
      } catch (error) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        delete api.defaults.headers.common["Authorization"];
        navigate("/signin");
      }
    }
    if (!authState.isAuthenticated) {
      get();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return authState;
};
