import { useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState < string > "dark";

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
};
