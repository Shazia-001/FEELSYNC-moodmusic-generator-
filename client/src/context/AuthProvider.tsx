import { useEffect, useState } from "react";


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

        if (!token) {
            setLoading(false);
            return;
        }

        const res = await fetch ("http://localhost:3000/me", {
            headers: {
                Authorization : `Bearer $(token)`,
            },
        });

        const data = await res.json();

        setUser(data);
        setLoading(false);
    };

    useEffect(() => {
        const initAuth = async () => {
            await fetchUser();
            setLoading(false);
        }

        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, logout}}>
            {children}
        </AuthContext.Provider>
    )
};
