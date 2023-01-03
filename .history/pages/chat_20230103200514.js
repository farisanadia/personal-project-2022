import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Chat() {
    const route = useRouter();

    const checkUser = async() => {
        if (loading) return;
        if (!user) route.push('/auth/login');
    }

    useEffect(() 
    
    return (
        <div>
            hehe
        </div>
    )
}