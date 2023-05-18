import jwt from "jsonwebtoken";
import userCredentials from "@/data/credentials.json";
import userData from "@/data/userData.json";
import { IUser } from "@/interfaces/user";

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
  const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

  if (!email || !password) {
    return {
      valid: false,
      message: "El correo electrónico y la contraseña son obligatorios",
    };
  }

  if (!emailRegex.test(email)) {
    return { valid: false, message: "El correo electrónico no es válido" };
  }

  if (password.length < 8) {
    return {
      valid: false,
      message: "La contraseña debe tener al menos 8 caracteres",
    };
  }

  if (
    email !== userCredentials.email ||
    password !== userCredentials.password
  ) {
    return {
      valid: false,
      message: "El correo electrónico o la contraseña son incorrectos",
    };
  }

  // Create token
  console.log(userData.id, process.env.NEXT_PUBLIC_JWT_SECRET);
  const token = jwt.sign(
    { userId: userData.id },
    process.env.NEXT_PUBLIC_JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  return {
    valid: true,
    message: "Inicio de sesión exitoso",
    user: userData,
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
  if (userId && userId !== userData.id) {
    throw Error("El usuario no existe");
  } else {
    return userData;
  }
}

