import kyClient from "@/lib/ky/kyClient";
import { categoryResponse } from "@/lib/types";
import { HTTPError } from "ky";

const deleteCategory = async (catId: string) => {
  try {
    const result = await kyClient
      .delete(`category/delete/${catId}`, {
        next: { tags: ["deleteCat"] },
      })
      .json<categoryResponse>();
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

export default deleteCategory;
