import { cookies } from "next/headers";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import CurrentProfileLink from "./CurrentProfileLink";

const Header = async () => {
  const token = (await cookies()).get("authCookie")?.value as string;

  if (!token) {
    return (
      <>
        {/* <AddProdcutButton /> */}
        <LoginButton />
      </>
    );
  }

  if (token) {
    return (
      <>
        <div className="flex items-center gap-2">
          <LogoutButton />
          <CurrentProfileLink />
        </div>
      </>
    );
  }
};

export default Header;
