import { auth_route } from "../constants/APIHandler";
import { getCookie } from "./CookieManage";

export const authenticate_user = async (
  Email: string,
  _Password: string,
  setErrorText: (text: string) => void,
  setIsLoading: (text: boolean) => void,
): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append("username", Email);
    formData.append("password", _Password);

    const response = await fetch(auth_route, {
      method: "POST",
      headers: {
        Accept: "*/*",
        Connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!response) {
      setErrorText("Request timed out");
      setIsLoading(false);
      return false;
    }

    if (response.status === 422) {
      setErrorText(response.status + " " + "unprocessable Entry");
    } else if (response.status === 400) {
      setErrorText(response.status);
    } else if (response.status === 200) {
      const cookie_status = await getCookie(response);
      if (cookie_status == false) {
        setErrorText("Authentication Success, Cookie assign failed");
        setIsLoading(false);
        return false;
      }
      return true;
    } else if (response.status == 304) {
      setErrorText(
        response.statusText + " " + "Already Logged In",
      );
    } else if (response.status == 404) {
      setErrorText(
        response.status + " " + response.statusText + " " + "Not Found",
      );
    } else {
      setErrorText(
        response.status +
          " " +
          response.statusText +
          " " +
          "Internal Server Error",
      );
    }
    setIsLoading(false);
    return false;
  } catch (e) {
    setIsLoading(false);
    const eror_message = (e as Error).message;
    setErrorText("Error: " + eror_message);
    return false;
  }
};
