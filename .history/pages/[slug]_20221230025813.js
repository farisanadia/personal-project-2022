import Message from "../components/message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";

export default function Details() {
    const router = useRouter()
    return(
        <div>
            <h1>hello</h1>
        </div>
    )
}