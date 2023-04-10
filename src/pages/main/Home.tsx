import { getDocs , collection } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../../config/Firebase';
import Post from './Post';

export interface Posts {
  id: string;
  userId: string;
  title: string;
  username: string;
  desc: string;
}




const Home = () => {
  const [postsLists, setPostsLists] = useState<Posts[] | null>(null);
  const postsRef = collection(db, "Posts");

    const getPosts = async () => {

      const data = await getDocs(postsRef);

     setPostsLists(data.docs.map((doc) => ({...doc.data() , id: doc.id})) as Posts[]);
    }

   useEffect( () => {
    getPosts()
   },[]);

  return (
    <div>
        {postsLists?.map((post, key) => 
           <Post post={post} key={key} />
        )}
    </div>
  )
}

export default Home