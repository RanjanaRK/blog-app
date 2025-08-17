import kyClient from "@/lib/ky/kyClient";
import { Categories, CategorySchemaType } from "@/lib/types";
import { HTTPError } from "ky";

const getAllCategory = async () => {
  try {
    const abc = await kyClient
      .get("category", {
        next: { tags: ["getAllCategory"] },
      })
      .json<{ result: Categories[] }>();

    console.log(abc);

    return {
      data: abc.result,
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

export default getAllCategory;
