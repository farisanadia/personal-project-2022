import Head from 'next/head'
import { Inter } from '@next/font/google'
import Message from "../components/message";
import { useEffect, useState } from 'react';
import { auth, db } from '../utils/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import { Router } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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

  //submit a like
  const submitLike = async() => {
    //check if user is logged in
    if(!auth.currentUser) return Router.push('/auth/login');
  }

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
              <button>{post.comments?.length > 0 ? post.comments?.length : 0 } comments</button>
            </Link>
            <button>like</button>
          </div>
        </Message>))}
      </div>
    </div>
  )
}
