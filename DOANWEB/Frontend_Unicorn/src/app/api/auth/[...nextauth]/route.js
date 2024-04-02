import axios from "axios";
import ms from "ms";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(tokenObject) {
  try {
    const tokenResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/refresh-token`,
      {
        refreshToken: tokenObject.refreshToken,
      }
    );
    const {
      data: {
        tokens: { accessToken, refreshToken, expireAccessToken },
      },
    } = tokenResponse.data;

    return {
      ...tokenObject,
      accessToken,
      refreshToken,
      expireAccessToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "login",
      name: "login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;
          const loginAccount = await axios.post(
            `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/login`,
            {
              email,
              password,
            }
          );
          return loginAccount.data;
        } catch (err) {
          if (err && err.response) {
            throw new Error(err.response.data.message);
          }
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ account, profile }) {
      return true;
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      try {
        if (user) {
          const {
            data: {
              user: { _id, email, role },
              tokens: { accessToken, refreshToken, expireAccessToken },
            },
          } = user;
          token._id = _id;
          token.email = email;
          token.role = role;
          token.accessToken = accessToken;
          token.expireAccessToken = expireAccessToken;
          token.refreshToken = refreshToken;
        }

        const shouldRefreshTime = Math.floor(
          (token.expireAccessToken - Date.now()) / 1000
        );

        // should refresh token if time remain < 10% access token expired time
        const BASE_TIME = Math.floor(
          (ms(process.env.NEXT_PUBLIC_JWT_ACCESSTOKEN_EXPIRED || "10 days") /
            1000) *
            (10 / 100)
        );
        console.log({ shouldRefreshTime, BASE_TIME });
        // If the token is still valid, just return it.
        if (shouldRefreshTime > BASE_TIME) {
          return Promise.resolve(token);
        }
        token = await refreshAccessToken(token);
        return Promise.resolve(token);
      } catch (err) {
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },
    async session({ session, user, token }) {
      session.user._id = token._id;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.expireAccessToken = token.expireAccessToken;
      session.error = token.error;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
