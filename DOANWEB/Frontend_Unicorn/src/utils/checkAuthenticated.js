import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

const isAuthenticated = async () => {
  try {
    const session = await getServerSession(authOptions);

    return !!session;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default isAuthenticated;
