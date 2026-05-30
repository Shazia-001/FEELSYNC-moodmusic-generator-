import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";


type User = {
    id: string;
    email: string;
    name: string;
};



export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true);
    

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }
    
    

    const fetchUser =  async () => {
        const token = localStorage.getItem("token")
        console.log("token from storage:", token)
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            console.log("sending authorization", `Bearer ${token}`);
            const res = await fetch ("http://localhost:3000/me", {
                
                headers: {
                    Authorization : `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                setUser(null);
                return
            }

            const data = await res.json();
            console.log("user from /me: ", data)
            setUser(data);

        } catch (err) {
            console.log(err)
            setUser(null);
        } finally {
            console.log("user fetched")
            setLoading(false);
        }
        
    };

    useEffect(() => {
        const initAuth = async () => {
            await fetchUser();
        }

        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, logout, fetchUser, setUser }}>
            {children}
        </AuthContext.Provider>
    )
};
