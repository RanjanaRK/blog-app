import { LogOut, Sun } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import ThemeButton from "./ThemeButton";
import Header from "./Header";

const Nav = () => {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-foreground/20 shadow-sm backdrop-blur-lg">
        <div className="mx-auto flex h-[52px] max-w-screen-xl items-center justify-between px-6">
          <Link href={"/"} className="text-2xl font-bold">
            TechyBlog
          </Link>

          <nav className="flex items-center gap-4">
            {/* <Link"admin ></Link> */}
            <Header />
            <ThemeButton />
          </nav>
        </div>
      </header>
    </>
  );
};

export default Nav;
