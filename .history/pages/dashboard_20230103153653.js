import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import Message from "../components/message";
import { BsTrash2Fill } from 'react-icons/bs';
import { AiFillEdit, AiOutlineLike } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import Link from "next/link";

export default function Dashboard(){
    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    const [posts, setPosts] = useState([]);


    const getData = async () => {
        if (loading) return;
        if (!user) return route.push("auth/login");
        const collectionRef = collection(db, 'posts');
        const q = query(collectionRef, where('user', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot => {
            setPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }));
        return unsubscribe;

    };

    //Delete Post
    const deletePost = async(id) => {
        const docRef = doc(db, 'posts', id)
        await deleteDoc(docRef);
    };
    
    //Get users data
    useEffect(() => {
        getData();
    }, [user, loading]);

    return(
        <div>
            <h1 className="text-xl pb-3">Your posts</h1>
            <div className="space-y-2">
                {posts.map(post => {
                    return(
                    <Message {...post} key={post.id}>
                        <div className="flex gap-3 items-center">
                            <Link href={{pathname: `/${post.id}`, query:{...post}}}>
                                <button className='flex items-center gap-1'>
                                <AiOutlineLike className="text-2xl"/>
                                {post.userLiked?.length} </button>
                            </Link>
                            <Link href={{pathname: `/${post.id}`, query:{...post}}}>
                                <button className='flex items-center gap-1'><BiComment className="text-xl"/>{post.comments?.length > 0 ? post.comments?.length : 0 }</button>
                            </Link>
                        </div>
                        <div class="flex justify-center">
  <div>
    <div class="dropdown relative">
      <button
        class="
          dropdown-toggle
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        "
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Dropdown button
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="caret-down"
          class="w-2 ml-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
          ></path>
        </svg>
      </button>
      <ul
        class="
          dropdown-menu
          min-w-max
          absolute
          hidden
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          hidden
          m-0
          bg-clip-padding
          border-none
        "
        aria-labelledby="dropdownMenuButton1"
      >
        <li>
          <a
            class="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
            href="#"
            >Action</a
          >
        </li>
        <li>
          <a
            class="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
            href="#"
            >Another action</a
          >
        </li>
        <li>
          <a
            class="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
            href="#"
            >Something else here</a
          >
        </li>
      </ul>
    </div>
  </div>
</div>
                        <div className="flex gap-4">
                            <button onClick={() => deletePost(post.id)}className="text-pink-600 flex items-center justify-center gap-2 py-2 text-small">
                                <BsTrash2Fill className="text-2xl"/>
                                Delete
                            </button>
                            <Link href={{pathname: '/post', query: post }}>
                                <button className="text-teal-600 flex items-center justify-center gap-2 py-2 text-small">
                                    <AiFillEdit className="text-2xl"/>
                                    Edit
                                </button>
                            </Link>
                        </div>
                    </Message>
                );})}
            </div>
            <button className="font-medium text-white bg-gray-800 py-2 px-4 my-6" onClick={() => auth.signOut()}>
                Sign out
            </button>
        </div>
    )
}