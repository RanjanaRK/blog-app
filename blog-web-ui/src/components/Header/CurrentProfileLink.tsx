"use client";

import { authAtom } from "@/lib/atoms/authAtom";
import { useAtom } from "jotai";
import Link from "next/link";
// import { useRouter } from "next/navigation";

const CurrentProfileLink = () => {
  const [auth] = useAtom(authAtom);
  // const [profileLink] = useAtom(profileLinkAtom);

  return (
    <>
      <div className="">
        <Link href={"/profile"} className="italic hover:underline">
          {auth?.first_name}
        </Link>
      </div>
    </>
  );
};

export default CurrentProfileLink;
