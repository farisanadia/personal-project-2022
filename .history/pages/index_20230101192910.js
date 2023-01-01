import Head from 'next/head'
import { Inter } from '@next/font/google'
import Message from "../components/message";
import { useEffect, useState } from 'react';
import { auth, db } from '../utils/firebase';
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineLike } from "react-icons/ai";
import { BiComment } from 'react-icons/bi';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const routeData = router.query;
  //Create state with all posts
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
    })
    return unsubscribe;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='flex items-center'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className='my-12 text-lg font-medium'>
        <h2>See what other people are saying</h2>
        {allPosts.map((post) => (
        <Message key={post.id} {...post}>
          <div className="flex gap-4">
            <Link href={{pathname: `/${post.id}`, query:{...post}}}>
              <div className='flex gap-1 items-center'>
              <BiComment className="text-xl"/>
              <button>{post.comments?.length > 0 ? post.comments?.length : 0 }</button>
              </div>
            </Link>
            <Link href={{pathname: `/${post.id}`, query:{...post}}}>
            
              <button className=''><AiOutlineLike className="text-2xl"/>{post.userLiked?.length} </button>
            </Link>
          </div>
        </Message>))}
      </div>
    </div>
  )
}
