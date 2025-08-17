"use client";

import { authAtom } from "@/lib/atoms/authAtom";
import { User } from "@/lib/types";
import { useAtom } from "jotai";
import Link from "next/link";
import { Button } from "../ui/button";
import AdminPost from "./AdminPost";
import EditProfile from "./EditProfile";
import { useEffect, useState } from "react";
type UserProfilePropsTypes = {
  userData: User;
};

const UserProfile = ({ userData }: UserProfilePropsTypes) => {
  const [auth] = useAtom(authAtom);
  const [joined, setJoined] = useState(userData.createdAt);
  const [updated, setUpdated] = useState(userData.updatedAt);

  useEffect(() => {
    setJoined(new Date(userData.createdAt).toLocaleDateString());
    setUpdated(new Date(userData.updatedAt).toLocaleDateString());
  }, [userData.createdAt, userData.updatedAt]);

  return (
    <>
      <div className="max-w-sm mx-auto space-y-4 border rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {userData.first_name} {userData.last_name}
            <span className="text-sm lowercase"> ( {userData.role} )</span>
          </h2>
          <p className="text-sm text-gray-400">{userData.email}</p>
          <p className="italic">Bio:{userData?.bio}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Joined:{joined}</span>
            <span>Last Updated: {updated}</span>
          </div>
          <div className="grid grid-cols-2 space-x-2">
            <Button className=" bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md transition duration-300">
              View Activity
            </Button>

            <EditProfile profileInfo={userData} />
          </div>
        </div>

        {auth?.role === "ADMIN" ? (
          <div className="grid grid-cols-2 gap-2 ">
            <Link href={"/admin/create-blog"}>
              <Button className="w-full">Create Post</Button>
            </Link>
            <Link href={"/admin/category"}>
              <Button className="w-full bg-chart-2">Categories</Button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>

      {auth?.role === "ADMIN" ? (
        <div className="pt-4 grid md:grid-cols-3">
          {userData.posts.map((i) => {
            return <AdminPost postData={i} key={i.id} />;
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserProfile;
