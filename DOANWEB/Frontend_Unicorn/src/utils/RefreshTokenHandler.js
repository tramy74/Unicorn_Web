import ms from "ms";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const RefreshTokenHandler = ({ setInterval }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      const shouldRefreshTime = Math.floor(
        (session.user.expireAccessToken - Date.now()) / 1000
      );

      // should refresh token if time remain < 10% access token expired time
      const BASE_TIME = Math.floor(
        (ms(process.env.NEXT_PUBLIC_JWT_ACCESSTOKEN_EXPIRED || "10 days") /
          1000) *
          (10 / 100)
      );
      const timeRemaining = shouldRefreshTime - BASE_TIME;

      setInterval(timeRemaining > 0 ? timeRemaining : 0);
    }
  }, [session]);

  return null;
};

export default RefreshTokenHandler;
