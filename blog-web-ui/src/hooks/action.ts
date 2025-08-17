"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const profileUpdateAction = async () => {
  revalidatePath("/profile");

  revalidateTag("getAuthProfile");
};

export const loginAction = async () => {
  revalidateTag("getAuthProfile");
};

export const logoutAction = async () => {
  redirect(`/auth/login`);
};

// export const adminPostRefetchAction = async () => {
//   revalidateTag("getAuthProfile");

//   revalidatePath("/profile");
// };

export const postRefetchAction = async () => {
  revalidateTag("getAllPost");

  revalidatePath("/");
};

export const commentsRefetchAction = async () => {
  revalidateTag("getCommentsOfPost");

  revalidatePath(`/blog/[postId]`);
};

export const categoryRefetchAction = async () => {
  revalidateTag("getAllCategory");

  revalidatePath(`/admin/category`);
};
