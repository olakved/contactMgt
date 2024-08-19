import { ReactNode } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

interface LayoutWrapperProps {
  children: ReactNode;
}

function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default LayoutWrapper;
