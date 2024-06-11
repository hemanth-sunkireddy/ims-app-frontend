import CookieManager from "@react-native-cookies/cookies";
import { domain } from "../constants/APIHandler";

export const getCookie = async (request: Response): Promise<boolean> => {
  try {
    if (!request) {
      throw new Error("Invalid request object");
    }

    const cookies = request.headers.get("set-cookie");
    if (!cookies) {
      return false;
    }

    // Extracting the value of the cookie from the header
    const cookieArray = cookies.split("; ");
    if (!cookieArray) {
      return false;
    }

    // Get the Access Token
    let accessToken = cookieArray[0];
    if (!accessToken) {
      return false;
    }
    const token_value = accessToken.split("=");
    if (!token_value) {
      return false;
    }
    const ims_app_token_value = token_value[1];
    if (!ims_app_token_value) {
      return false;
    }

    // console.log("ACCESS TOKEN: ", ims_app_token_value);

    await CookieManager.set(domain, {
      name: "access_token_ims_app",
      value: ims_app_token_value,
      path: "/",
      httpOnly: false,
    });

    // Get cookie of the user for verification
    const cookie = await CookieManager.get(domain, false);
    if (cookie) {
      console.log("Verifying cookie of the user: ", cookie);
      console.log("Assigned cookie to the user successfully...");
      return true;
    } else {
      console.log("FAILED IN COOKIE FETCH: ", cookie);
      return false;
    }
  } catch (error) {
    console.error("Failed to handle cookies: ", error);
    return false;
  }
};
