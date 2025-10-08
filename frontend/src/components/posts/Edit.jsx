import usePost from "@/hooks/usePost";
import { updatePost } from "@/redux/actions/post";
import { Col, CustomNotification, Divider, Flex, Form, Row, Spin } from "@/ui";
import Uploader from "@/ui/Uploader";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";

const { Text, Submit } = Form;

export default function Edit() {
  const navigate = useNavigate()

  const {id} = useParams();
  const {post,loading} = usePost(id)

  const dispatch = useDispatch();




  const onFinish = async (values) => {
    console.log(values);
    const response = await dispatch(updatePost({ id, data: values }));
    if (response) {
      CustomNotification({
        type: "success",
        message: "مقاله با موفقیت ویرایش شد",
        style: {
          fontFamily: "vazirmatn",
        },
      });
      return navigate('/posts')
    } else {
      CustomNotification({
        type: "error",
        message: "خطا در ویرایش مقاله",
        style: {
          fontFamily: "vazirmatn",
        },
      });
    }
  };



  if (loading) {
    return <Spin fullscreen delay={2} />;
  }

  return (
    <div>
     <Flex justify="space-between" align="center">
     <h2>ویرایش مقاله {post?.title}</h2>
     <Link to={'/posts'}>
     لیست مقالات
     </Link>
     </Flex>
      <Divider />
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24, offset: 0 }}
        name="basis"
        onFinish={onFinish}
        initialValues={post || {}}
      >
        <Row gutter={[12]}>
        <Col xs={24} md={12}>
            <Text label="عنوان" name="title" required={true} />
          </Col>
          <Col xs={24} md={12}>
            <Text label="متن" name="text" required={true} />
          </Col>
          <Col xs={24} md={24}>
               <Uploader/>
          </Col>
          <Col xs={24} md={24}>
            <Submit disabled={loading} />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
