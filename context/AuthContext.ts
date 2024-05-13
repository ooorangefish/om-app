import { createContext } from "react";
import { type User } from "@/types";

const AuthContext = createContext<{
  user?: User | null;
  setUserInfo: (userInfo: User | null) => void;
} | null>(null);

export default AuthContext;
