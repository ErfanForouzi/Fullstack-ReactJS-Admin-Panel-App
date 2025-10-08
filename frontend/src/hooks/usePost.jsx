import { getPost } from "@/redux/actions/post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function usePost(id){

    const dispatch = useDispatch()
    const post = useSelector((state)=>state.post)
    const loading = useSelector((state)=>state.postLoading)

     useEffect(() => {
       dispatch(getPost(id));
      }, [id]);
    return {post,loading}
}