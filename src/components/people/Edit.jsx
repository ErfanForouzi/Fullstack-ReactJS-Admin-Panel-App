import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { GENDERS } from "@/tools/constants";
import { request } from "@/tools/request";
import {
  Col,
  CustomNotification,
  DatePicker,
  Divider,
  Form,
  Row,
  Spin,
} from "@/ui";
import usePerson from "@/hooks/usePerson";

const { Email, Password, Text, Select, Checkbox, Submit } = Form;

export default function Edit() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {id} = useParams();
  const navigate = useNavigate();


 const {person,loading} = usePerson(id)

  const onFinish = async (values) => {
    setIsSubmitting(true);
    const response = await request({
      url: `/users/${id}`,
      method: "put",
      data: values,
    });
    if (response.status === 200) {
      navigate(`/people/${id}`);
      CustomNotification({
        type: "success",
        message: "کاربر با موفقیت ویرایش شد",
        style: {
          fontFamily: "vazirmatn",
        },
      });
    }
    setIsSubmitting(false);
  };

  if(loading){
    return <Spin fullscreen delay={2}/>
  }

  return (
    <div>
      <h2>ویرایش کاربر {person?.name}</h2>
      <Divider />
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24, offset: 0 }}
        name="basis"
        onFinish={onFinish}
        initialValues={person}
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
            <Submit disabled={isSubmitting} loading={isSubmitting}/>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
