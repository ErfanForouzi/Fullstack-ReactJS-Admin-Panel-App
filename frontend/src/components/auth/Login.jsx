import { Button, Col, Divider, Form, Row } from "@/ui";
import { useSelector } from "react-redux";

export default function Login({onLoginFinish,setStep}) {
    const theme = useSelector((state) => state.theme);

    const { Password, Text, Submit } = Form;

  return (
    <>
    <h2 style={{ color: theme === "dark" ? "#ffffff" : "#000000" }}>
      ورود به حساب کاربری
    </h2>
    <Divider />
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24, offset: 0 }}
      name="basis"
      onFinish={onLoginFinish}
    >
      <Row gutter={[12]}>
        <Col xs={24} md={12}>
          <Text label="نام کاربری" name="username" required={true} />
        </Col>
        <Col xs={24} md={12}>
          <Password label="رمز عبور" name="password" required />
        </Col>

        <Col xs={24} md={24}>
          <Submit disabled={false} label="ورود" />
        </Col>
        <Col xs={24} md={24}>
          <Button variant="outlined" onClick={()=>setStep(2)}>
            ثبت نام نکردید؟
          </Button>
        </Col>
      </Row>
    </Form>
  </>
  )
}
