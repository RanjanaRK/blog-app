import kyServer from "@/lib/ky/kyServer";
import { PostType } from "@/lib/types";
import { HTTPError } from "ky";

const postById = async (id: string) => {
  try {
    const data = await kyServer
      .get(`posts/${id}`, {
        next: { tags: [`getPostById-${id}`] },
      })
      .json<{ result: PostType }>();

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
        errorMessage = errorJson.message || httpError.message;
      } catch {
        errorMessage = httpError.message;
      }
    } else {
      errorMessage = httpError.message;
    }

    return {
      data: null,
      isError: true,
      error: errorMessage,
    };
  }
};

export default postById;
