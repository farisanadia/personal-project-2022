import Head from 'next/head'
import { Inter } from '@next/font/google'
import Message from "../components/message";
import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, onSnapshot, orderBy } from 'firebase/firestore';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  //Create state with all posts
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionEef = collection(db, 'posts');
    const q = query(collectionEef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({...doc.data()})))
    })
    return unsubscribe;
  };

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
      </div>
    </div>
  )
}
