import { Container } from "@mui/material";

export default function LayoutProducts({ children }) {
  return (
    <>
      <Container>
        <div>{children}</div>
      </Container>
    </>
  );
}
