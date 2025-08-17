import kyClient from "@/lib/ky/kyClient";
import { RegisterFormType, RegisterResponse } from "@/lib/types";
import { HTTPError } from "ky";

const register = async (rfData: RegisterFormType) => {
  try {
    const response = await kyClient.post("auth/register", {
      next: { tags: ["authRegister"] },
      json: {
        first_name: rfData.first_name,
        last_name: rfData.last_name,
        email: rfData.email,
        password: rfData.password,
        role: rfData.role,
        adminSecret: rfData.adminSecret,
      },
    });
    const result = await response.json<RegisterResponse>();
    console.log(result);
    console.log(response);

    return {
      success: true,
      message: result.message,
    };
  } catch (error: any) {
    if (error.name === "HTTPError") {
      const httpError = error as HTTPError;
      let errorJson: any = {};

      try {
        errorJson = await httpError.response.json<any>();
      } catch (parseError) {
        // If parsing fails, we can fallback to a default message
        return {
          success: false,
          message: "An unknown error occurred.",
        };
      }

      // Use optional chaining and a default message if needed.
      const errorMessage =
        errorJson?.errors?.[0]?.message ||
        errorJson?.message ||
        "Unknown error occurred.";
      return {
        success: false,
        message: errorMessage,
      };
    } else {
      return {
        success: false,
        message: "Network Error",
      };
    }
  }
};

export default register;
