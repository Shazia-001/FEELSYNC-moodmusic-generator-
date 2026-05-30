
import { createContext } from "react";

export type User = {
    id: string;
    email: string;
    name: string;
};

export type AuthContextType = {
    user: User | null;
    loading: boolean;
    logout: () => void;
    fetchUser: () => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

