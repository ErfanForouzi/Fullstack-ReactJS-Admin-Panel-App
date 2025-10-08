import usePerson from "@/hooks/usePerson";
import { updatePerson } from "@/redux/actions/person";
import { Col, CustomNotification, Divider, Form, Row, Spin } from "@/ui";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const { Email, Password, Text, Select, Checkbox, Submit } = Form;

export default function Edit() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();
  const { person, loading } = usePerson(id);
const editPersonLoading = useSelector(state=>state.editPersonLoading)

  const onFinish = async (values) => {
    const response = await dispatch(updatePerson({ id, data: values }));
    if (response) {
      CustomNotification({
        type: "success",
        message: "کاربر با موفقیت ویرایش شد",
        style: {
          fontFamily: "vazirmatn",
        },
      });
      return navigate('/people')
    } else {
      CustomNotification({
        type: "success",
        message: "خطا در ویرایش کاربر",
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
      <h2>ویرایش کاربر {person?.username}</h2>
      <Divider />
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24, offset: 0 }}
        name="basis"
        onFinish={onFinish}
        initialValues={person || {}}
      >
        <Row gutter={[12]}>
          <Col xs={24} md={12}>
            <Text label="نام کاربری" name="username" required={true} />
          </Col>

          <Col xs={24} md={24}>
            <Submit disabled={editPersonLoading} loading={editPersonLoading} />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
