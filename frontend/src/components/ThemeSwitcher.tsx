import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { toggleTheme } from "../features/ui/uiSlice";
import { useEffect } from "react";
import Switch from "./inputs/Switch";

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const { isDark } = useAppSelector((state: RootState) => state.ui);

  const themeHandler = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="">
      <Switch enabled={isDark} onChange={themeHandler} />
    </div>
  );
};

export default ThemeSwitcher;
