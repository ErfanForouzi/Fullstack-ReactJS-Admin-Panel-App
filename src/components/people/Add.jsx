import { GENDERS } from "@/tools/constants";
import { request } from "@/tools/request";
import {
  Col,
  CustomNotification,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
} from "@/ui";
import { useState } from "react";
import { useNavigate } from "react-router";

const { Email, Password, Text, Select, Checkbox, Submit } = Form;

export default function Add() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);
    const response = await request({
      url: "/users",
      method: "post",
      data: values,
    });
    if (response.status === 201) {
      navigate("/people");
      CustomNotification({
        type: "success",
        message: "کاربر با موفقیت ساخته شد",
        style: {
          fontFamily: "vazirmatn",
        },
      });
    }
    console.log(response);
    setLoading(false);
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
            <Text
              label="شماره تلفن"
              name="phone"
              required={true}
              len={11}
              max={11}
              isDigit
            />
          </Col>
          <Col xs={24} md={12}>
            <Email label={"ایمیل"} required name="email" />
          </Col>
          <Col xs={24} md={12}>
            <Password label="رمز عبور" name="password" required />
          </Col>

          <Col xs={24} md={12}>
            <Select label="جنسیت" name="gener" required options={GENDERS} />
          </Col>

          <Col xs={24} md={12}>
            <DatePicker
              name="birthday"
              label="رمز عبور"
              required={true}
              message="تاریخ تولد الزامی میباشد"
              style={{ width: "100%" }}
            />{" "}
          </Col>
          <Col xs={24} md={24}>
            <Checkbox name="admin" label="مدیر" />
          </Col>
          <Col xs={24} md={24}>
            <Submit disabled={loading} />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
