import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2));
    return new Response("Welcome authenticated user", {
      status: 200,
    });
  } else {
    // Not Signed in
    return new Response("Unauthorized access detected", {
      status: 401,
    });
  }
}
