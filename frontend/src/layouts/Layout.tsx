import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="m-5 lg:container lg:mx-auto ">
        <SearchBar />
      </div>
      <div className="mx-auto py-10 flex-1 px-5  sm:w-4/5">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
