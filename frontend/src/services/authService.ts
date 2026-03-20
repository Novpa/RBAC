import type { Login } from "../types/loginTypes";

export const handleSubmitLogin = ({ email, password }: Login) => {
  console.log(email, password);
};
