import { ConfigProvider, theme as AntTheme } from "antd";
import faIR from "antd/locale/fa_IR";
import JalaliProvider from "antd-jalali-v5";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTheme } from "@/redux/actions/theme";
export default function AntdProvider({ children }) {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(()=>{
    const theme = localStorage.theme || 'dark'
    dispatch(setTheme(theme))
  
  },[])
  useEffect(()=>{
    localStorage.theme = theme.mode;
    if(theme === 'dark'){
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
    } else{
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')

    }
        
  },[theme.mode])


  return (
    <ConfigProvider
      direction="rtl"
      locale={faIR}
      // theme={{ token: {colorBgBase:"var(--main-color)", fontFamily:"vazirmatn" } }}
      theme={{
        token: { fontFamily: "vazirmatn" },
        
        algorithm:
          theme.mode === "dark" ? AntTheme.darkAlgorithm : AntTheme.defaultAlgorithm,
      }}
    >
      <JalaliProvider />

      {children}
    </ConfigProvider>
  );
}
