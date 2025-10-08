import { logout } from "@/redux/actions/auth";
import { setTheme } from "@/redux/actions/theme";
import { Layout, Flex, Button, CustomNotification } from "@/ui";
import { SunOutlined, MoonOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const { Header: AntHeader } = Layout;
export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  async function logoutHanlder() {
    dispatch(logout());
    CustomNotification({
      type: "success",
      message: "کاربر با موفقیت از حساب کاربری خارج شد",
      style: {
        fontFamily: "vazirmatn",
      },
    });

    navigate("/");
  }

  return (
    <AntHeader
      style={{ backgroundColor: theme.mode === "dark" ? "#000000" : "#ffffff" }}
      className="header"
    >
      <Flex align="center" justify="space-between">
        <Flex gap={2}>
          <span>پنل مدیریت</span>
          <span>({user.username})</span>
        </Flex>
        <Flex align="center" gap={9}>
          <Button
            onClick={() =>
              dispatch(setTheme(theme.mode === "light" ? "dark" : "light"))
            }
            type="primary"
            icon={theme.mode === "light" ? <MoonOutlined /> : <SunOutlined />}
          />
          <LogoutOutlined onClick={logoutHanlder} className="pointor" />
        </Flex>
      </Flex>
    </AntHeader>
  );
}
