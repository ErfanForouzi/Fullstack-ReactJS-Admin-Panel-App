// import { useState } from "react";
// import { CustomNotification, Popconfirm, message } from "@/ui";
// import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
// import { request } from "@/tools/request";
// import { useDispatch } from "react-redux";
// import { removePerson } from "@/redux/actions/person";
// const Remove = ({ id}) => {
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch()

//   const confirm = async () => {
//     setLoading(true);
//     const response = await request({ url: `/users/${id}`,method:"delete" });
//     if(response.status === 200){
//         CustomNotification({type:"success",message:"کاربر با موفقیت حذف شد",  style: {
//             fontFamily: "vazirmatn",
//           },})

//           dispatch(removePerson(id))
//     }
//     setLoading(false);
//   };

//   return (
//     <Popconfirm description="آیا از حذف اطمینان داری؟" onConfirm={confirm}>
//       {loading ? <LoadingOutlined /> : <DeleteOutlined />}
//     </Popconfirm>
//   );
// };

// export default Remove;
import { removePersonAsyncAction } from "@/redux/actions/person";
import { CustomNotification, Popconfirm } from "@/ui";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
const Remove = ({ id }) => {
  const loading = useSelector((state) => state.removePersonLoading);

  const dispatch = useDispatch();

  const confirm = async () => {
    const response = await dispatch(removePersonAsyncAction(id));
    if(response){
      CustomNotification({
        type: "success",
        message: "کاربر با موفقیت حذف شد",
        style: {
          fontFamily: "vazirmatn",
        },
      });
    }else{
      CustomNotification({
        type: "error",
        message: "خطا در حذف کاربر",
        style: {
          fontFamily: "vazirmatn",
        },
      });
    }
  };

  return (
    <Popconfirm description="آیا از حذف اطمینان داری؟" onConfirm={confirm}>
      {loading ? <LoadingOutlined /> : <DeleteOutlined />}
    </Popconfirm>
  );
};

export default Remove;
