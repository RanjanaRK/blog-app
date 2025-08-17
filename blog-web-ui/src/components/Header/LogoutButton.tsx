"use client";

import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import logout from "@/hooks/auth/logout";
import { logoutAction } from "@/hooks/action";

const LogoutButton = () => {
  const pathname = usePathname();
  const { push } = useRouter();

  const logoutFn = async () => {
    const { message, success } = await logout();

    if (!success) {
      toast.error(message);
    }

    if (success) {
      toast.success(message);

      // push("/auth/login");
      await logoutAction();
    }
  };

  // if (pathname === "/" || pathname === "/profile") {
  //   return (
  //     <>
  //       <Button onClick={logoutFn} variant={"destructive"} className="py-1">
  //         <LogOut size={28} /> Logout
  //       </Button>
  //     </>
  //   );
  // }

  return (
    <>
      <Button onClick={logoutFn} variant={"destructive"} className="py-1">
        <LogOut size={28} /> Logout
      </Button>
    </>
  );
};

export default LogoutButton;
