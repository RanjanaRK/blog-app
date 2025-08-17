import kyClient from "@/lib/ky/kyClient";
import { categoryResponse, CategorySchemaType } from "@/lib/types";
import { HTTPError } from "ky";

const addCategory = async (data: CategorySchemaType) => {
  try {
    const response = await kyClient.post("category/create", {
      next: { tags: ["addCat"] },
      json: {
        name: data.name,
      },
    });

    const result = await response.json<categoryResponse>();
    console.log(result);
    console.log(response);
    return {
      success: true,
      message: result.message,
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

export default addCategory;
