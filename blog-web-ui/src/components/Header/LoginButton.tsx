"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const LoginButton = () => {
  const { push } = useRouter();
  return (
    <>
      <Button onClick={() => push("/auth/login")} variant={"ghost"} size={"sm"}>
        Login
      </Button>
    </>
  );
};

export default LoginButton;
