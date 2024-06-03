import CookieManager from "@react-native-cookies/cookies";

export const getCookie = async (
  request: Response,
  uri_for_auth: string,
): Promise<boolean> => {
  try {
    if (!request) {
      throw new Error("Invalid request object");
    }

    const cookies = request.headers.get("set-cookie");
    console.log("REQUEST HEADERS: ", request.headers);

    if (!cookies) {
      return false;
    }
    console.log("COOKIES: ", cookies);
    // Extracting the value of the cookie from the header
    const cookieArray = cookies.split("; ");
    console.log("cookie Array: ", cookieArray);
    if (!cookieArray) {
      return false;
    }

    // Get the Access Token
    let accessToken = cookieArray[4];
    console.log("Access Token: ", accessToken)
    if (!accessToken) {
      return false;
    }
    const access_token_value = accessToken.split(", ");
    console.log("Access Token Value: ", access_token_value);
    if (!access_token_value) {
      return false;
    }
    const token_dict = access_token_value[1];
    const token_value = token_dict.split("=");
    console.log("TOKEN DICT: ", token_dict);
    console.log("TOKEN VALUE: ", token_value)
    if (!token_value) {
      return false;
    }
    const ims_app_token_value = token_value[1];
    console.log("IMS APP TOKEN VALUE: ", ims_app_token_value);
    if (!ims_app_token_value) {
      return false;
    }

    console.log("ACCESS TOKEN: ", ims_app_token_value);

    await CookieManager.set(uri_for_auth, {
      name: "access_token_ims_app",
      value: ims_app_token_value,
      path: "/",
      httpOnly: false,
    });

    console.log("Status of assigning cookie to the user: ", "Success");

    // Get cookie of the user for verification
    const cookie = await CookieManager.get(uri_for_auth, false);
    if (cookie) {
      console.log("Verifying cookie of the user: ", cookie);
      console.log("Assigned cookie to the user successfully...");
      return true;
    } else {
      console.log("FAILED IN COOKIE FETCH: ", cookie);
      return false;
    }
  }
  catch (error) {
    console.error("Failed to handle cookies: ", error);
    return false;
  }
};
