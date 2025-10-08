import { notification } from "@/ui";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const icons = {
  success: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
  error: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
  info: <InfoCircleOutlined style={{ color: "#1890ff" }} />,
  warning: <WarningOutlined style={{ color: "#faad14" }} />,
};

export default function CustomNotification({
  type = "success",
  message= '',
  description = "",
  duration = 4,
  placement = "topRight",
  style,
  className,
  ...props
}) {
  notification.open({
    message,
    description,
    icon: icons[type],
    placement,
    duration: duration,
    style,
    className,
    ...props,
  });
}
