import { auth_route, domain } from "../constants/APIHandler";
import { getCookie } from "./CookieManage";

export const authenticate_user = async (
  Email: string,
  _Password: string,
  setErrorText: (text: string) => void,
  setIsLoading: (text: boolean) => void,
): Promise<boolean> => {
  try {
    // Creating Form Data Which is defined in Backend
    const formData = new FormData();
    formData.append("username", Email);
    formData.append("password", _Password);

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Request timed out"));
      }, 5000);
    });

    const responsePromise = fetch(auth_route, {
      method: "POST",
      headers: {
        Accept: "*/*",
        Connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const response = await Promise.race([responsePromise, timeoutPromise]) as Response;
    if (response.status === 422) {
      setErrorText(response.status + " " + "unprocessable Entry");
    }
    else if (response.status === 400) {
      setErrorText(response.status + " " + "Invalid Username or Password");
    }
    else if (response.status === 200) {
      const cookie_status = await getCookie(response, domain);
      if (cookie_status == false) {
        setErrorText(
          "Authentication Success, Cookie assign failed, Please Click Login again",
        );
        setIsLoading(false);
        return false;
      }
      setIsLoading(false);
      return true;
    }
    else {
      setErrorText(response.status + + " " + response.statusText);
    }
    setIsLoading(false)
    return false;
  }
  catch (e) {
    setIsLoading(false);
    const eror_message = (e as Error).message;
    setErrorText("Error: " + eror_message);
    return false;
  }
};
