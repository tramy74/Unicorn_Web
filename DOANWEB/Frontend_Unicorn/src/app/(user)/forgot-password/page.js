import ForgotPassword from "@/components/auth/forgot-password/ForgotPassword";
import ROUTERS_PATH from "@/configs/config.routers.path";
import isAuthenticated from "@/utils/checkAuthenticated";
import { Container } from "@mui/material/";
import { redirect } from "next/navigation";
export async function generateMetadata({ params, searchParams }, parent) {
  const listImages = ["https://i.imgur.com/eQROz30.png"];
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "Quên mật khẩu",
    openGraph: {
      images: [...listImages, ...previousImages],
    },
  };
}

async function Home() {
  // Check is user was already login -> redirect to home
  const isLogged = await isAuthenticated();
  if (isLogged) {
    redirect(ROUTERS_PATH.HOME_PAGE, "replace");
  }

  return (
    <Container>
      <ForgotPassword />
    </Container>
  );
}
export default Home;
