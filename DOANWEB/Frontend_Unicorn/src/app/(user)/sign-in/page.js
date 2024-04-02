import Login from "@/components/auth/sign-in/Login";
import ROUTERS_PATH from "@/configs/config.routers.path";
import isAuthenticated from "@/utils/checkAuthenticated";
import { Container } from "@mui/material/";
import { redirect } from "next/navigation";

export async function generateMetadata({ params, searchParams }, parent) {
  const listImages = ["https://i.imgur.com/H4bai3H.png"];
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "Đăng nhập tài khoản",
    openGraph: {
      images: [...listImages, ...previousImages],
    },
  };
}

export default async function Home({ searchParams }) {
  // Check is user was already login -> redirect to home
  const isLogged = await isAuthenticated();
  if (isLogged) {
    redirect(ROUTERS_PATH.HOME_PAGE, "replace");
  }
  return (
    <Container>
      <Login searchParams={searchParams} />
    </Container>
  );
}
