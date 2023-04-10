import { useForm } from "react-hook-form"; 
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
interface CreateFormPost{
  title: string,
  desc: string
}

const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigare = useNavigate();

  const schma = yup.object().shape({
    title: yup.string().required("You must add title"),
    desc: yup.string().required("You must add description"),
  });
  
  const {register, handleSubmit, formState: {errors} } = useForm<CreateFormPost>({
    resolver: yupResolver(schma),
  });

  const postsRef = collection(db, "Posts");

  const createPosts = async (data: CreateFormPost) => {
    await addDoc(postsRef, {
      title: data.title,
      desc: data.desc,
      username: user?.displayName,
      userId: user?.uid,
    })

    navigare("/")
  }

  return (
      <div className="containerForm">
         <form onSubmit={handleSubmit(createPosts)}>
          <h2>post title<span>*</span></h2>
            <input type="text" placeholder='enter a post title' {...register("title")}/>
            <p style={{color: "red"}}>{errors.title?.message}</p>
          <h2>post description<span>*</span></h2>
            <textarea placeholder='enter a post description' {...register("desc")}/>
            <p style={{color: "red"}}>{errors.desc?.message}</p>
            <input type="submit" value='post' className="btn"/>
        </form>
      </div>
  )
}

export default CreateForm