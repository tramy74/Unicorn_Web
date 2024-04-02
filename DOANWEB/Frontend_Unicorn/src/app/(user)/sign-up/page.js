import SignUp from "@/components/auth/sign-up/SignUp";
import ROUTERS_PATH from "@/configs/config.routers.path";
import isAuthenticated from "@/utils/checkAuthenticated";
import { redirect } from "next/navigation";


export async function generateMetadata({ params, searchParams }, parent) {
  const listImages = ["https://i.imgur.com/Is9cu6a.png"];
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "Đăng ký tài khoản",
    openGraph: {
      images: [...listImages, ...previousImages],
    },
  };
}

async function RegisterPage() {
  // Check is user was already login -> redirect to home
  const isLogged = await isAuthenticated();
  if (isLogged) {
    redirect(ROUTERS_PATH.HOME_PAGE, "replace");
  }
  return <SignUp />;
}

export default RegisterPage;
