import { Button, Col, Divider, Form, Row } from "@/ui";
import { useSelector } from "react-redux";

const { Password, Text, Submit } = Form;
export default function Register({setStep,onRegisterFinish}) {
    const theme = useSelector((state) => state.theme);

  return (
    <>
    <h2 style={{ color: theme === "dark" ? "#ffffff" : "#000000" }}>
       ثبت نام کاربر
    </h2>
    <Divider />
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24, offset: 0 }}
      name="basis"
      onFinish={onRegisterFinish}
    >
      <Row gutter={[12]}>
        <Col xs={24} md={12}>
          <Text label="نام کاربری" name="username" required={true} />
        </Col>
        <Col xs={24} md={12}>
          <Password label="رمز عبور" name="password" required />
        </Col>

        <Col xs={24} md={24}>
          <Submit disabled={false} label="ثبت نام" />
        </Col>
        <Col xs={24} md={24}>
          <Button variant="outlined" onClick={()=>setStep(1)}>
            قبلا ثبت نام کردید؟
          </Button>
        </Col>
      </Row>
    </Form>
  </>
  )
}
