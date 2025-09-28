import { setTheme } from "@/redux/actions/theme";
import { Layout, Flex, Button } from "@/ui";
import { PoweroffOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

const { Header: AntHeader } = Layout;
export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  return (
    <AntHeader className="header">
      <Flex align="center" justify="space-between">
        <span>پنل مدیریت</span>
        <Button
          onClick={() => dispatch(setTheme(theme.mode === 'light'?'dark':'light'))}
          type="primary"
          icon={theme.mode === "light" ? <MoonOutlined /> : <SunOutlined />}
        />
      </Flex>
    </AntHeader>
  );
}
