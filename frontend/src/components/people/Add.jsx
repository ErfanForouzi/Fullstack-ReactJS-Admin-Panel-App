import { createPerson } from "@/redux/actions/person";
import {
  Col,
  CustomNotification,
  Divider,
  Form,
  Row
} from "@/ui";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const { Email, Password, Text, Select, Checkbox, Submit } = Form;

export default function Add() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const onFinish = async (values) => {
      const response = await dispatch(createPerson(values));
      if (response) {
        CustomNotification({
          type: "success",
          message: "کاربر با موفقیت ساخته شد",
          style: {
            fontFamily: "vazirmatn",
          },
        });
        return navigate('/people')
      } else {
        CustomNotification({
          type: "success",
          message: "خطا در ساخت کاربر",
          style: {
            fontFamily: "vazirmatn",
          },
        });
      }
    };
  

  return (
    <div>
      <h2>افزودن کاربر جدید</h2>
      <Divider />
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24, offset: 0 }}
        name="basis"
        onFinish={onFinish}
      >
        <Row gutter={[12]}>
          <Col xs={24} md={12}>
            <Text label="نام کاربری" name="username" required={true} />
          </Col>
          <Col xs={24} md={12}>
            <Password label="رمز عبور" name="password" required />
          </Col>
          <Col xs={24} md={24}>
            <Submit disabled={loading} />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
