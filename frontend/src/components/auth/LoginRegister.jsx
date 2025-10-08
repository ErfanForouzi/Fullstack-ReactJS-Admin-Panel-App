import { login, register } from "@/redux/actions/auth";
import { CustomNotification, Form } from "@/ui";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import Register from "./Register";


export default function LoginRegister() {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const state = useSelector((state=>state))
  console.log(state);
  const onLoginFinish = async (values) => {
    const response = await dispatch(login(values));
    if (response) {
      CustomNotification({
        type: "success",
        style: {
          fontFamily: "vazirmatn",
        },
        message: "کاربر با موفقیت وارد حساب کاربری شد",
      });
    } else {
      CustomNotification({
        type: "error",
        style: {
          fontFamily: "vazirmatn",
        },
        message: "نام کاربری یا کلمه عبور صحیح نمیباشد",
      });
    }
    console.log(response);
  };
  const onRegisterFinish = async (values) => {
    const response = await dispatch(register(values));
    console.log(response);
    if(response?.data?.status === 201){
      CustomNotification({
        type: "success",
        style: {
          fontFamily: "vazirmatn",
        },
        message: "کاربر با موفقیت ثبت نام شد",
      });
     
    }else if(response?.data?.status ===400){
      CustomNotification({
        type: "error",
        style: {
          fontFamily: "vazirmatn",
        },
        message: "کاربر قبلا ثبت نام کرده است",
      });
    }
  };

  return (
    <div className="container">
      {step === 1 ? (
         <Login key={'login'} onLoginFinish={onLoginFinish} setStep={setStep}/>
      ) : step === 2 && (
        <Register key={'register'} onRegisterFinish={onRegisterFinish} setStep={setStep}/>
      )}
    </div>
  );
}
