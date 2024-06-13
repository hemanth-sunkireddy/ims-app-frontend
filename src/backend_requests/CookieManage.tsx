import CookieManager from "@react-native-cookies/cookies";
import { domain } from "../constants/APIHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    let cookieDict: { [key: string]: string } = {};
    cookieArray.forEach((cookie) => {
      const cookieSplit = cookie.split("=");
      if (cookieSplit.length === 2) {
        cookieDict[cookieSplit[0]] = cookieSplit[1];
      }
    });

    // Get the Access Token
    let ims_app_token_value = cookieDict["access_token_ims_app"];
    if (!ims_app_token_value) {
      return false;
    }

    await CookieManager.set(domain, {
      name: "access_token_ims_app",
      value: ims_app_token_value,
      path: "/",
      httpOnly: false,
    });

    await AsyncStorage.setItem("last_login", new Date().toString());

    const cookie = await CookieManager.get(domain, false);
    if (cookie) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
