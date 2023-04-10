import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { Posts as IPost } from "./Home";
import { auth, db } from "../../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: IPost;
}

interface Like {
    likeId: string;
    userId: string;
}

const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [userLike, setUserLike] = useState<Like[] | null>(null)

  const likesRef = collection(db, "likes");


  const likeDoc = query(likesRef, where("postId", "==" , post.id));

  const getlikes = async () => {
    const data = await getDocs(likeDoc);
    setUserLike(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})));
  }

  useEffect(() => {
    getlikes();
  }, []);




  const hasUserLiked = userLike?.find((like) => like.userId === user?.uid);

  const addlike = async () => {
    try{
    const newLike = await addDoc(likesRef, { userId: user?.uid,  postId: post.id, })
    if(user) {
        setUserLike((prov) => 
            prov ? [...prov, {userId: user.uid , likeId: newLike.id}] : [{userId: user.uid, likeId: newLike.id}])
      }
    } catch(err) {
        console.log(err)
    }
  }


  const removelike = async () => {
    try{
    const deleteToLikeQuery = query(likesRef, where("postId", "==" , post.id), where("userId", "==" , user?.uid));
    const likeToDeleteData = await getDocs(deleteToLikeQuery);
    const likedId = likeToDeleteData.docs[0].id;
    const likeToDelete = doc(db, "likes", likedId);

    await deleteDoc(likeToDelete);
    if(user) {
        setUserLike((prov) => prov && prov.filter((like) => like.likeId !== likedId))
      }
    } catch(err) {
        console.log(err)
    }
  }



  return (
    <div className="posts">
      <div className="container-post">
        <div>
          <h2 className="name">@{post.username}</h2>
        </div>
        <div>
          <h4 className="title">{post.title}</h4>
        </div>
        <div>
          <p className="desc">{post.desc}</p>
        </div>
        <div className="likes">
         <button onClick={hasUserLiked ? removelike : addlike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
         {userLike && <p>Likes: {userLike?.length}</p>}
      </div>
      </div>
    </div>
  );
};

export default Post;
