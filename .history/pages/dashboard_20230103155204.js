import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import Message from "../components/message";
import { BsTrash2Fill } from 'react-icons/bs';
import { AiFillEdit, AiOutlineLike } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import Link from "next/link";
import { Menu, Transition } from '@headlessui/react';

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
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                Options
                                </Menu.Button>
                            </div>

                        <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a>
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a

                >
                  License
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
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