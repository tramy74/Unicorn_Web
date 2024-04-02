import ProfileNavigation from "@/components/profile/ProfileNavigation";
import { Box, Container } from "@mui/material";

export default function LayoutProfile({ children }) {
  return (
    <>
      <Container className="pt-[5rem]">
        <Box
          className="profile-infomation-container"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            gap: "2rem",
            paddingBottom: "2rem",
          }}
        >
          <ProfileNavigation></ProfileNavigation>
          {children}
        </Box>
      </Container>
    </>
  );
}
