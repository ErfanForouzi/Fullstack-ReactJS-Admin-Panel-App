import { createPost } from "@/redux/actions/post";
import { Col, CustomNotification, Divider, Flex, Form, Row } from "@/ui";
import Uploader from "@/ui/Uploader";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

const { Email, Password, Text, Select, Checkbox, Submit } = Form;

export default function Add() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log(values);
    const response = await dispatch(createPost(values));
    if (response) {
      CustomNotification({
        type: "success",
        message: "مقاله با موفقیت ساخته شد",
        style: {
          fontFamily: "vazirmatn",
        },
      });
      return navigate("/posts");
    } else {
      CustomNotification({
        type: "error",
        message: "خطا در ساخت مقاله",
        style: {
          fontFamily: "vazirmatn",
        },
      });
    }
  };

  return (
    <div>
      <Flex justify="space-between" align="center">
      <h2>افزودن مقاله جدید</h2>
        <Link to={"/posts"}>لیست مقالات</Link>
      </Flex>
      <Divider />
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24, offset: 0 }}
        name="basis"
        onFinish={onFinish}
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
