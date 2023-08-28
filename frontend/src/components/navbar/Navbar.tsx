"use client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div
      className="fixed w-full md:pl-52 bg-neutral-50 dark:bg-darkBg z-10 transition-colors duration-75 ease-in-out
    "
    >
      <div className="py-4  relative dark:border-0">
        <Container>
          <div
            className="
            flex
            flex-row
            items-center
            justify-between
            gap-3
            relative
            "
          >
            <Logo />

            <Search />

            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
