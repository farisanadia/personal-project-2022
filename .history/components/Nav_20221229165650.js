import Link from "next/link";

export default function Nav(){
    return(
        <nav className="">
            <Link href="/">
                <button>Creative Minds</button>
            </Link>
            <ul>
                <Link href={"/auth/login"}></Link>
            </ul>
        </nav>
    );
}