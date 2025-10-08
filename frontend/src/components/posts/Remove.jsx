import { removePostAsyncAction } from "@/redux/actions/post";
import { CustomNotification, Popconfirm } from "@/ui";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
const Remove = ({ id,getData }) => {
  const loading = useSelector((state) => state.removePostLoading);

  const dispatch = useDispatch();

  const confirm = async () => {
    const response = await dispatch(removePostAsyncAction(id));
    
    if(response){
      CustomNotification({
        type: "success",
        message: "مقاله با موفقیت حذف شد",
        style: {
          fontFamily: "vazirmatn",
        },
      });
      getData()
    }else{
      CustomNotification({
        type: "error",
        message: "خطا در حذف مقاله",
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
