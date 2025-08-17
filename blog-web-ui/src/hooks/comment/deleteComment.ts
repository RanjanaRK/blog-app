import kyClient from "@/lib/ky/kyClient";
import { commentDeleteResponse } from "@/lib/types";
import { HTTPError } from "ky";

const deleteComment = async (commentId: string) => {
  try {
    const result = await kyClient
      .delete(`comments/delete/${commentId}`, {
        next: { tags: ["deleteBlog"] },
      })
      .json<commentDeleteResponse>();
    console.log(result);
    console.log(result.message);
    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
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

export default deleteComment;
