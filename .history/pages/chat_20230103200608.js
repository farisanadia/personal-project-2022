import { useRouter } from "next/router";
import { useEffect } from "react";
import 

export default function Chat() {
    const route = useRouter();

    const checkUser = async() => {
        if (loading) return;
        if (!user) route.push('/auth/login');
    }

    useEffect(() => {
        checkUser();
    }, [user, loading]);
    
    return (
        <div>
            hehe
        </div>
    )
}