
import { Form, Input, Select as AntSelect, Checkbox as AntCheckbox,Button,  DatePicker as AntDatePicker } from "antd";
import {digitsArToEn,digitsFaToEn} from "@persian-tools/persian-tools"

 function Text({ label, required, name, len, min, max,isDigit, ...props }) {
    function normalize(value){
        return digitsFaToEn(digitsArToEn(value)).replace(/\D/,"")
    }   
  return (
    <Form.Item
      label={label}
      name={name}
      normalize={isDigit && normalize}
      rules={[{ required }, { len }, { min }, { max }]}
    >
      <Input {...props} maxLength={max || len} />
    </Form.Item>
  );
}
 function Email({
  label,
  required,
  name,
  len,
  min,
  max,
  type,
  ...props
}) {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required }, { len }, { min }, { max }, { type: "email" }]}
    >
      <Input {...props} maxLength={max || len} />
    </Form.Item>
  );
}
 function Password({ label, required, name, len, min, max, ...props }) {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required }, { len }, { min }, { max }]}
    >
      <Input.Password {...props} maxLength={max || len} />
    </Form.Item>
  );
}
 function Select({ label, required, name, options = [], ...props }) {
  return (
    <Form.Item label={label} name={name} rules={[{ required }]}>
      <AntSelect {...props}>
        {options.map(({value,label}) => (
          <AntSelect.Option key={value} value={value}>{label}</AntSelect.Option>
        ))}
      </AntSelect>
    </Form.Item>
  );
}
 function Checkbox({ label, name, ...props }) {
    return (
        <Form.Item name={name}  valuePropName="checked">
        <AntCheckbox {...props}>{label}</AntCheckbox>
      </Form.Item>
    );
  }
 function Submit({ label = 'ثبت', name, ...props }) {
   return(
    <Form.Item>
    <Button type="primary" htmlType="submit" {...props}>
      {label}
    </Button>
  </Form.Item>
   )
  }

  function DatePicker({
    name,
    label,
    required,
    message,
    ...props
  }){
    return(
        <Form.Item
          name={name}
          label={label}
          rules={[
            {
              required: true,
              message: message,
            },
          ]}
        >
          <AntDatePicker {...props} />
        </Form.Item>
      );
  }


  export default Object.assign(Form,{
    Text,
    Email,
    Password,
    Select,
    Submit,
    Checkbox,
    DatePicker
  })