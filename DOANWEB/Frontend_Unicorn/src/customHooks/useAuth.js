import ROUTERS_PATH from "@/configs/config.routers.path";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data: session, status } = useSession();
  useEffect(() => {
    const handleRefreshTokenError = async () => {
      try {
        await signOut({ callbackUrl: ROUTERS_PATH.HOME_PAGE, redirect: true });
      } catch (err) {
        console.log(err);
      }
    };
    // Handle error refresh token
    if (session?.error === "RefreshAccessTokenError") {
      handleRefreshTokenError();
    }
    if (session === null) {
      setIsAuthenticated(false);
    } else if (session !== undefined) {
      setIsAuthenticated(true);
    }
  }, [session]);

  return { isAuthenticated, session };
};
export default useAuth;
