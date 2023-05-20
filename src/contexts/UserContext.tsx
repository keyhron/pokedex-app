import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { IUser, ICredentials } from "@/interfaces/user";
import { validateSignIn, validateUserToken } from "@/utils/validateSignIn";
import Loader from "@/components/Atoms/Loader";

interface IContextUser {
  user?: IUser;
  setLoading: Dispatch<SetStateAction<boolean>>;
  signIn: ({ email, password }: ICredentials) => void;
  signOut: () => void;
}

export const UserContext = createContext<IContextUser>({} as IContextUser);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signIn = ({ email, password }: ICredentials) => {
    setLoading(true);

    try {
      const { message, valid, user, token } = validateSignIn(email, password);

      if (valid && token) {
        // Set token
        localStorage.setItem("token", token);
        setUser(user);

        // Redirect
        router.push("/");
      } else {
        Swal.fire({
          icon: "error",
          text: message,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const signOut = () => {
    // Redirect
    router.push("/iniciar-sesion");
    // Remove token
    localStorage.removeItem("token");
    setUser(undefined);
  };

  const handleUserToken = () => {
    setLoading(true);
    try {
      const user = validateUserToken();
      setUser(user);
      if (router.pathname === "/iniciar-sesion") {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      signOut();
    } finally {
      setLoading(false);
    }
  };

  // Validate pages in initial page
  useEffect(() => {
    handleUserToken();
  }, []);

  return (
    <UserContext.Provider
      value={{
        // Values
        user,
        // Methods
        setLoading,
        signIn,
        signOut,
      }}
    >
      {loading && (
        <div
          className="fixed z-50 bg-black bg-opacity-30 flex items-center justify-center w-full h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="loader"
        >
          <Loader />
        </div>
      )}
      {children}
    </UserContext.Provider>
  );
};

