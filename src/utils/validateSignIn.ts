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

  console.log(
    "normal",
    userCredentials.some(
      (user) => user.email === email && user.password === password
    )
  );
  console.log(
    false,
    !userCredentials.some(
      (user) => user.email === email && user.password === password
    )
  );

  // Validate credentials
  if (
    !userCredentials.some(
      (user) => user.email === email && user.password === password
    )
  ) {
    return {
      valid: false,
      message: "El correo electrónico o la contraseña son incorrectos",
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

