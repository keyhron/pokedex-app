import jwt from "jsonwebtoken";
import userCredentials from "@/data/credentials.json";
import { IUser } from "@/interfaces/user";
import userData from "@/data/userData.json";
import errorsEs from "@/data/errorsEs.json";

interface IValidateData {
  valid: boolean;
  message: string;
  user?: IUser;
  token?: string;
}

interface IDecodedToken {
  userId: string;
}

export function validateSignIn(email: string, password: string): IValidateData {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!email || !password) {
    return {
      valid: false,
      message: errorsEs.signIn.required,
    };
  }

  if (!emailRegex.test(email)) {
    return { valid: false, message: errorsEs.signIn.email.invalid };
  }

  if (password.length < 8) {
    return {
      valid: false,
      message: errorsEs.signIn.password.minLength,
    };
  }

  // Validate credentials
  if (
    !userCredentials.some(
      (user) => user.email === email && user.password === password
    )
  ) {
    return {
      valid: false,
      message: errorsEs.signIn.incorrect,
    };
  }

  // Find user
  const user = userData.find((user) => user.email === email) as IUser;

  // Create token
  const token = jwt.sign(
    { userId: user.id },
    process.env.NEXT_PUBLIC_JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  return {
    valid: true,
    message: "Inicio de sesión exitoso",
    user,
    token,
  };
}

export function validateUserToken() {
  const token = localStorage.getItem("token") as string;
  const decodedToken = jwt.verify(
    token,
    process.env.NEXT_PUBLIC_JWT_SECRET as string
  );
  const userId = (decodedToken as IDecodedToken).userId;

  // Find user
  const user = userData.find((user) => user.id === userId) as IUser;
  if (!user) {
    throw Error("El usuario no existe");
  } else {
    return user;
  }
}

