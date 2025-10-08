import { removePersonAsyncAction } from "@/redux/actions/person";
import { CustomNotification, Popconfirm } from "@/ui";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
const Remove = ({ id,getData }) => {
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
      getData()
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
