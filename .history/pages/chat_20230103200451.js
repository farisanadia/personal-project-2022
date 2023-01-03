import { useRouter } from "next/router";

export default function Chat() {
    const route = useRouter();

    const checkUser = async() => {
        if (loading) return;
        if (!user) route.push('/auth/login')
    }
    
    return (
        <div>
            hehe
        </div>
    )
}