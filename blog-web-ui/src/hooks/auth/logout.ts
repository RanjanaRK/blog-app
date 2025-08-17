import kyClient from "@/lib/ky/kyClient";
import { HTTPError } from "ky";

const logout = async () => {
  try {
    await kyClient
      .post("auth/logout", {
        next: { tags: ["authLogout"] },
      })
      .json();
    return {
      success: true,
      message: "User Logout Successfull",
    };
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      const errorJson = await httpError.response.json<any>(); // eslint-disable-line

      return {
        success: false,
        message: errorJson.errors[0].message as string,
      };
    } else {
      return {
        success: false,
        message: "Network Error",
      };
    }
  }
};

export default logout;
