import LoadingBox from "@/components/generals/LoadingBox";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import MainContent from "@/components/layouts/MainContent";

export const metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL),

  title: {
    template: "%s | Unicorn",
    default: "Quần áo thời trang online",
  },
  description: "Quần áo thời trang online",
  applicationName: "Unicorn",
  keywords: [
    "quần áo thời trang",
    "bán quần áo online",
    "thời trang nam/nữ",
    "unicorn",
    "quần áo bền vững",
    "sản phẩm thân thiện với môi trường",
    "đồ thể thao cao cấp",
  ],

  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Quần áo thời trang online | Unicorn",
    description: "Quần áo thời trang online",
    siteName: "Quần áo thời trang online | Unicorn",
    images: [
      {
        url: "https://i.imgur.com/NGfdvx3.jpg",
        width: 500,
        height: 800,
        alt: "Trang chủ Unicorn",
      },
      {
        url: "https://i.imgur.com/hkDs6DF.png",
        width: 500,
        height: 800,
        alt: "Danh sách sản phẩm | Unicorn",
      },
      {
        url: "https://i.imgur.com/IDELyHr.png",
        width: 500,
        height: 800,
        alt: "Chi tiết sản phẩm | Unicorn",
      },
      {
        url: "https://i.imgur.com/H4bai3H.png",
        width: 500,
        height: 800,
        alt: "Đăng nhập tài khoản | Unicorn",
      },
      {
        url: "https://i.imgur.com/Is9cu6a.png",
        width: 500,
        height: 800,
        alt: "Đăng ký tài khoản | Unicorn",
      },
      {
        url: "https://i.imgur.com/eQROz30.png",
        width: 500,
        height: 800,
        alt: "Quên mật khẩu | Unicorn",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default async function UserLayout({ children }) {
  return (
    <>
      <Header />
      <MainContent>{children}</MainContent>
      <LoadingBox />
      <Footer />
    </>
  );
}
