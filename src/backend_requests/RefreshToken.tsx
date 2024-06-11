import { cookie_extend_route } from "../constants/APIHandler";
import { getCookie } from "./CookieManage";
import { getAccessToken } from "./AccessToken";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const extend_cookie = async (): Promise<boolean> => {
  const accessToken = await getAccessToken();
  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Request timed out"));
      }, 5000);
    });

    const responsePromise = await fetch(cookie_extend_route, {
      method: "POST",
      headers: { Cookie: `access_token_ims_app=${accessToken}` },
    });

    const response = (await Promise.race([
      responsePromise,
      timeoutPromise,
    ])) as Response;
    if (response.status === 200) {
      const cookie_status = await getCookie(response);
      if (cookie_status == false) {
        return false;
      }

      await AsyncStorage.setItem("last_login", new Date().toString());
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};