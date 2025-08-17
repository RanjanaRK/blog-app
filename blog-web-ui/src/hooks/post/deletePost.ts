import kyClient from "@/lib/ky/kyClient";
import { BlogDeleteResponse } from "@/lib/types";
import { HTTPError } from "ky";

const deletePost = async (blogId: string) => {
  try {
    const result = await kyClient
      .delete(`posts/delete/${blogId}`, {
        next: { tags: ["deleteBlog"] },
      })
      .json<BlogDeleteResponse>();
    console.log(result);
    console.log(result.message);
    return {
      success: true,
      message: result.message,
    };
  } catch (error: any) {
    if (error instanceof HTTPError) {
      let json: any;
      try {
        json = await error.response.json();
      } catch {
        return { success: false, message: error.message };
      }

      const msg =
        json.errors?.[0]?.message || json.message || JSON.stringify(json);

      return {
        success: false,
        message: msg,
      };
    }

    return {
      success: false,
      message: "Network Error",
    };
  }
};

export default deletePost;
