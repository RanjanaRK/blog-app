import kyClient from "@/lib/ky/kyClient";
import { EditProfileFormSchemaType, responseType } from "@/lib/types";
import { HTTPError } from "ky";

const editAuthProfile = async (data: EditProfileFormSchemaType) => {
  try {
    const result = await kyClient
      .patch(`users/profile/edit`, {
        next: { tags: ["editAuthProfile"] },
        json: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          bio: data.bio,
        },
      })
      .json();

    console.log(result);

    return {
      success: true,
      message: "updated profile",
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

export default editAuthProfile;
