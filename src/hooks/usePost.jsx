import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "@/redux/actions/post";
import { request } from "@/tools/request";

export default function usePost(id){

    const dispatch = useDispatch()
    const post = useSelector((state)=>state.post)
  
     useEffect(() => {
        async function getPost() {
          const response = await request({ url: `/posts/${id}` });
          if (response?.status === 200) {
            dispatch(setPost(response?.data));
          } 
        }
        getPost();
      }, [id]);
    return post
}