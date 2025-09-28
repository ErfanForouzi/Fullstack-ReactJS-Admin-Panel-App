import { Layout } from "@/ui";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";
import Sidebar from "@/components/general/Sidebar";
import Providers from "@/providers";
import Routing from "@/routers/Routing";
import "@/assets/styles/main.css";

const { Content } = Layout;
export default function App() {
  return (
    <Providers>
      <Layout>
        <Sidebar />
        <Layout>
          <Header />
          <Content className="content">
            <Routing/>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Providers>
  );
}
