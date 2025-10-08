import useTheme from "@/hooks/useTheme";
import { theme as AntTheme, ConfigProvider } from "antd";
import JalaliProvider from "antd-jalali-v5";
import faIR from "antd/locale/fa_IR";
export default function AntdProvider({ children }) {
  const theme = useTheme();

  return (
    <ConfigProvider
      direction="rtl"
      locale={faIR}
      // theme={{ token: {colorBgBase:"var(--main-color)", fontFamily:"vazirmatn" } }}
      theme={{
        token: {
          fontFamily: "vazirmatn",
        
        },
        algorithm:
          theme === "dark"
            ? AntTheme.darkAlgorithm
            : AntTheme.defaultAlgorithm
      }}
    >
      <JalaliProvider />

      {children}
    </ConfigProvider>
  );
}
