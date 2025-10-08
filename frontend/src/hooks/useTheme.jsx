import { setTheme } from "@/redux/actions/theme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useTheme() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const theme = localStorage.theme || "light";
    dispatch(setTheme(theme));
  }, []);
  useEffect(() => {
    localStorage.theme = theme.mode;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme.mode]);

  return theme.mode
}
