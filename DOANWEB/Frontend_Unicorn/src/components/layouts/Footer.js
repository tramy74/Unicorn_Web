import { Box, Container, Typography } from "@mui/material";
const Footer = () => {
  const data = [
    {
      title: "Giới thiệu",
      contents: [
        {
          title: "Về chúng tôi",
        },
        {
          title: "Thông tin về thời trang",
        },
        {
          title: "Cơ hội việc làm",
        },
      ],
    },
    {
      title: "Hỗ trợ",
      contents: [
        {
          title: "FAQ",
        },
        {
          title: "Chính sách trả hàng",
        },
        {
          title: "Chính sách bảo mật",
        },
      ],
    },
    {
      title: "Liên hệ",
      contents: [
        {
          title: "Facebook",
        },
        {
          title: "Instagram",
        },
        {
          title: "Twitter",
        },
      ],
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "4rem",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            marginBottom: "8rem",
            padding: "0 1rem",
          }}
        >
          <Typography
            sx={{
              width: "100%",
              height: "0.1rem",
              backgroundColor: "black",
            }}
          ></Typography>
          <Typography
            sx={{
              transform: "translate(-50%, -50%)",
              left: "50%",
              backgroundColor: "white",
              display: "block",
              top: "50%",
              position: "absolute",
              fontWeight: "bold",
              textTransform: "capitalize",
              fontSize: "3rem",
              padding: "1rem",
            }}
          >
            Contact us
          </Typography>
        </Box>
        <Container
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            maxWidth: "1100px",

            flexDirection: { xs: "column", md: "row" },
            gap: "1rem",
          }}
        >
          {data.map((item, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingBottom: "1rem",
                gap: "1rem",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  paddingBottom: "1rem",
                  fontSize: "3rem",
                }}
              >
                {item.title}
              </Typography>
              {item?.contents?.map((childItem) => (
                <Typography
                  key={childItem.title}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {childItem.title}
                </Typography>
              ))}
            </Box>
          ))}
        </Container>

        <Box
          sx={{
            marginTop: "2rem",
            width: "100%",
            height: "300px",
            background: "url(/footer.jpg) no-repeat center center fixed",
            backgroundSize: "cover",
          }}
        ></Box>
      </Box>
    </>
  );
};
export default Footer;
