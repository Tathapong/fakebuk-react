import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Container from "../container/Container";

function AuthLayout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default AuthLayout;
