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
    <div className='items-center'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className='text-lg font-medium space-y-2'>
        <h2 className='text-xl pb-3'>See what other people are saying</h2>
        {allPosts.map((post) => (
        <Message key={post.id} {...post}>
          <div className="flex gap-2 items-center">
            <Link href={{pathname: `/${post.id}`, query:{...post}}}>
              <button className='flex items-center gap-1'>
                <AiOutlineLike className="text-2xl"/>
              {post.userLiked?.length} </button>
            </Link>
            <Link href={{pathname: `/${post.id}`, query:{...post}}}>
              <button className='flex items-center gap-1'><BiComment className="text-xl"/>{post.comments?.length > 0 ? post.comments?.length : 0 }</button>
            </Link>
          </div>
        </Message>))}
      </div>
    </div>
  )
}
