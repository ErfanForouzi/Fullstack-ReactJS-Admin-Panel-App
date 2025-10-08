import "@/assets/styles/main.css";
import Footer from "@/components/general/Footer";
import Header from "@/components/general/Header";
import Sidebar from "@/components/general/Sidebar";
import Routing from "@/routers/Routing";
import { Layout, LoadingSkeleton } from "@/ui";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginRegister from "./components/auth/LoginRegister";
import { getUser, setUserLoading } from "./redux/actions/auth";
import { getAccessToken } from "./tools/utils";

const { Content } = Layout;
export default function App() {
  const dispatch = useDispatch();
  const userIsLogging = useSelector((state) => state.userIsLogging);
  const userLoading = useSelector((state) => state.userLoading);
  useEffect(() => {
    getAccessToken() ? dispatch(getUser()) : dispatch(setUserLoading(false));
  }, []);
  return (
    <>
      { userLoading ? <LoadingSkeleton rows={12}/>:userIsLogging ? (
        <Layout>
          <Sidebar />
          <Layout>
            <Header />
            <Content className="content">
              <Routing />
            </Content>
            <Footer />
          </Layout>
        </Layout>
      ) : (
        <Layout>
          <LoginRegister />
        </Layout>
      )}
    </>
  );
}
