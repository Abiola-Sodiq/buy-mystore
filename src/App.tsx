import { RouterProvider } from "react-router-dom";
import { router } from "./Route/router";
import { Suspense } from "react";
import { ConfigProvider } from "antd";
import { getThemeConfig } from "./utils/theme.config";

const App = () => {
  return (
    <ConfigProvider theme={getThemeConfig()}>
      <Suspense fallback={<h1>Loading</h1>}>
        <RouterProvider router={router} />
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
