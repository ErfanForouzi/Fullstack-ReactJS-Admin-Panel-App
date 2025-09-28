import usePost from "@/hooks/usePost";
import { getPost } from "@/redux/actions/post";
import { Divider, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";

export default function Detail() {
  // const [post,setPost] = useState({})
  const [loading,setLoading] = useState(true)
  const {id} = useParams();
  const post = useSelector((state)=>state.post)
  const dispatch = useDispatch()

  useEffect(()=>{
    setLoading(true)
    dispatch(getPost(id));
    setLoading(false)
  },[])

  if(loading){
    return <Spin fullscreen/>
  }


  return (
    <div>
      <h1>id:{post?.id}</h1>
      <h2>Title:{post?.title}</h2>
      <div>
        Body: {post?.body}
      </div>
      <Divider/>
      <Link to={'/posts'}>بازگشت به لیست</Link>
    </div>
  )
}
