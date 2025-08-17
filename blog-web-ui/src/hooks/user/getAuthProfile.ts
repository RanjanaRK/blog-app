import kyServer from "@/lib/ky/kyServer";
import { DefautType, User } from "@/lib/types";
import { error } from "console";
import { HTTPError } from "ky";
import { cookies } from "next/headers";

const getAuthProfile = async () => {
  const token = (await cookies()).get("authCookie")?.value as string;
  try {
    const data = await kyServer
      .get("users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["getAuthProfile"] },
        // searchParams: {
        //   fields: "id , first_name",
        // },
      })
      .json<{ result: User }>();

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

export default getAuthProfile;
