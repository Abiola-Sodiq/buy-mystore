import { ThemeConfig } from "antd";

export const getThemeConfig = (): ThemeConfig | undefined => {
  return {
    token: {
      colorPrimary: "#1B2C68",
    },
    components: {
      Select: {
        colorBgContainer: "transparent",
        controlHeight: 50,
      },
    },
  };
};
