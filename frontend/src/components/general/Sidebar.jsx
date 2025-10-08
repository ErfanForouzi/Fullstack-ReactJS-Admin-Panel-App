import { Flex, Layout, Menu } from "@/ui";
import {Link} from "react-router"
import {
  UserOutlined,
  UserAddOutlined,
  TeamOutlined,
  DashboardOutlined,
  EditOutlined,
  
} from "@ant-design/icons";
import CustomLink from "@/ui/CustomLink";

const { Sider: AntSidebar } = Layout;

const items = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label:<Link to={'/'}>داشبورد</Link>,
  },
  {
    key: "people",
    icon: <UserOutlined />,
    label: "کاربران",
    children: [
      {
        key: "people-list",
        label: <Link to={'/people'}>لیست کاربران</Link>,
        icon: <TeamOutlined />,
      },
      {
        key: "people-add",
        label:<CustomLink role={'ADMIN'} to={'/people/add'}>
        <Flex gap={9}>
        <UserAddOutlined />
        افزودن کاربر
        </Flex>
        </CustomLink>,
      },
    ],
  },
  {
    key: "posts",
    icon: <EditOutlined />,
    label: "مقالات",
    children: [
      {
        key: "posts-list",
       
        label:<Link to={'/posts'}>
        مقالات
      </Link>,
      },
      {
        key: "posts-add",
         label:<CustomLink role={'ADMIN'} to={'/posts/add'}>
        افزودن مقاله
      </CustomLink>,
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <AntSidebar width="18%" collapsible theme="light">
      <Menu
        defaultSelectedKeys={["dashboard"]}
        defaultOpenKeys={["people"]}
        mode="inline"
        items={items}
      ></Menu>
    </AntSidebar>
  );
}
