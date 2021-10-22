import { LoginPage } from "../components/index/login/login-page";
import { DefaultLayout } from "../layouts/default-layout/default-layout";

export default function Page() {
  return <LoginPage />;
}
Page.Layout = DefaultLayout;
Page.LayoutProps = {
  title: "Đăng nhập",
};
