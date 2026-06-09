import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function GuestRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (user) {
        return <Navigate to="/dashboard"/>
    }

    return children;
}
