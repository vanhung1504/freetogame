import React from "react";
import { Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import bg from "../../assets/images/freetogame-logo.png";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={`py-2 bg-dark position-fixed ${styles["header"]}`}>
      <Container>
        <Stack
          direction="horizontal"
          className="justify-content-center text-white"
        >
          <Link to="/">
            <img src={bg} />
          </Link>
        </Stack>
      </Container>
    </header>
  );
};

export default Header;
