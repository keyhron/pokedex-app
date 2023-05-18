import { createContext, useState, ReactNode } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import { IUser, ICredentials } from "@/interfaces/user";
import { validateSignIn, validateUserToken } from "@/utils/validateSignIn";

interface IContextUser {
  user?: IUser;
  signIn: ({ email, password }: ICredentials) => void;
  signOut: () => void;
  handleUserToken: () => void;
}

export const UserContext = createContext<IContextUser>({
  user: undefined,
  signIn: () => {},
  signOut: () => {},
  handleUserToken: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>();
  const router = useRouter();

  const signIn = ({ email, password }: ICredentials) => {
    const { message, valid, user, token } = validateSignIn(email, password);
    console.log({ message, valid, user, token });
    if (valid && token) {
      // Set token
      localStorage.setItem("token", token);
      setUser(user);

      // Redirect
      router.push("/dashboard");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    }
  };

  const signOut = () => {
    // Remove token
    localStorage.removeItem("authToken");
    // Redirect
    router.push("/");
  };

  const handleUserToken = () => {
    try {
      const user = validateUserToken();
      setUser(user);
      router.push("/");
    } catch (error) {
      signOut();
    }
  };

  return (
    <UserContext.Provider
      value={{
        // Values
        user,
        // Methods
        signIn,
        signOut,
        handleUserToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

