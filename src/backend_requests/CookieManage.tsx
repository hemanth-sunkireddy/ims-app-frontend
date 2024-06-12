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
    const cookieArray = cookies.split("; ");
    if (!cookieArray) {
      return false;
    }
    let expire_exist = 0;
    cookieArray.forEach((pair) => {
      const [key, value] = pair.split("=");
      if (key === "expires") expire_exist++;
    });

    let ims_app_token_value = "";
    if (expire_exist === 1) {
      let accessToken = cookieArray[4];
      if (!accessToken) {
        return false;
      }
      const access_token_value = accessToken.split(", ");
      if (!access_token_value) {
        return false;
      }
      const token_dict = access_token_value[1];
      const token_value = token_dict.split("=");
      if (!token_value) {
        return false;
      }
      ims_app_token_value = token_value[1];

      if (!ims_app_token_value) {
        return false;
      }
    } else {
      let accessToken = cookieArray[0];
      if (!accessToken) {
        return false;
      }
      const token_value = accessToken.split("=");
      if (!token_value) {
        return false;
      }
      ims_app_token_value = token_value[1];
      if (!ims_app_token_value) {
        return false;
      }
    }
    const todayDate = new Date();
    const dateAfter20Days = new Date(todayDate);
    dateAfter20Days.setDate(todayDate.getDate() + 20);
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
