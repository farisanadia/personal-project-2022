import Link from "next/link";

export default function Nav(){
    return(
        <nav className="flex justify-between items-center py-10">
            <Link href="/">
                <button> Creative Minds</button>
            </Link>
            <ul>
                <Link href={"/auth/login"}>
                    <button>Join Now</button>
                </Link>
            </ul>
        </nav>
    );
}