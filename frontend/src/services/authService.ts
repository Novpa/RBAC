import axios from "axios";
import type { Login } from "../types/loginTypes";

export const handleSubmitLogin = async ({ email, password }: Login) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
