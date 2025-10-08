import { getPost } from "@/redux/actions/post";
import { BASE_URL } from "@/tools/constants";
import Card from "@/ui/Card";
import { Divider, Flex, Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";

export default function Detail() {
  const {id} = useParams();
  const post = useSelector((state)=>state.post)
  const loading = useSelector((state)=>state.postLoading)
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(getPost(id));
  },[id])

  if(loading){
    return <Spin fullscreen/>
  }


  return (
    <div>
      <Flex justify="space-between" align="center">
      <h1>id:{post?.id}</h1>
      <Link to={'/posts'}>بازگشت به لیست</Link>

      </Flex>
      <Card title={post?.title} desc={post?.text} src={post.image}/>
      <Divider/>
    </div>
  )
}
