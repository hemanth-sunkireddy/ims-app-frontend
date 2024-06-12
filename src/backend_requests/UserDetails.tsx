import { UserTypes } from "../custom-types";
import { user_details } from "../constants/APIHandler";
import { getAccessToken } from "./AccessToken";

let userMail = "";
let userName = "";
let rollno = "";
let userType: UserTypes = UserTypes.Default;

export const get_user_details = async (
  setErrorText: (text: string) => void,
  setSuccessText: (text: string) => void,
): Promise<boolean> => {
  try {
    const accessToken = await getAccessToken();
    if (accessToken) {
      const responsePromise = await fetch(user_details, {
        method: "GET",
        headers: { Cookie: `access_token_ims_app=${accessToken}` },
      });

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Request timed out"));
        }, 3000);
      });

      const response = await Promise.race([responsePromise, timeoutPromise]);
      if (response.status === 200) {
        const responseData = await (response as Response).json();
        userMail = responseData.email;
        userName = responseData.name;
        rollno = responseData.rollNumber;
        if (
          responseData.userType === "Academics Students" &&
          responseData.role === "Student"
        ) {
          userType = UserTypes.Student;
        } else if (
          responseData.userType === "EMPLOYEE" &&
          responseData.role === "Faculty"
        ) {
          userType = UserTypes.Faculty;
        } else if (
          responseData.userType === "EMPLOYEE" &&
          responseData.role === "Staff"
        ) {
          userType = UserTypes.Staff;
        }
        setSuccessText(response.status + " " + " Redirecting to Dashboard...");
        return true;
      } else {
        setSuccessText("");
        setErrorText(response.status + " " + "Error in getting user details");
        return false;
      }
    } else {
      setErrorText("Error: Access token not retrieved");
      return false;
    }
  } catch (e) {
    const eror_message = (e as Error).message;
    setErrorText("Error: " + eror_message.toString());
    return false;
  }
};
export { userMail, userName, rollno, userType };
