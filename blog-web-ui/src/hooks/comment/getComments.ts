import kyServer from "@/lib/ky/kyServer";
import { Comments } from "@/lib/types";
import { HTTPError } from "ky";

const getComments = async (postId: string) => {
  try {
    const data = await kyServer
      .get(`comments/${postId}`, {
        next: { tags: ["getCommentsOfPost"] },
        // searchParams: {
        //   fields: "id , first_name",
        // },
      })
      .json<{ result: Comments[] }>();

    return {
      data: data.result,
      isError: false,
      error: null,
    };
  } catch (error) {
    const httpError = error as HTTPError;

    let errorMessage: string = "An unknown error occurred";

    if (httpError.response) {
      try {
        const errorJson = await httpError.response.json<any>();
        // Adjust according to the structure of your error response
        errorMessage = errorJson.errors
          ? errorJson.errors[0]?.message
          : httpError.message;
      } catch {
        // In case parsing fails.
        errorMessage = httpError.message;
      }
    } else {
      // For errors that do not have a response (e.g., network errors)
      errorMessage = httpError.message;
    }

    return {
      data: null,
      isError: true,
      error: errorMessage,
    };
  }
};

export default getComments;
