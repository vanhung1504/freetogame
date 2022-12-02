import React from "react";
import { Container, Stack } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="py-3 bg-dark">
      <Container>
        <Stack
          direction="horizontal"
          className="justify-content-center text-white"
        >
          Copyright by Văn Hùng
        </Stack>
      </Container>
    </footer>
  );
};

export default Footer;
