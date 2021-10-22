import { RegisterPage } from "../components/index/register/register-page";
import { DefaultLayout } from "../layouts/default-layout/default-layout";

export default function Page() {
  return <RegisterPage />;
}
Page.Layout = DefaultLayout;
Page.LayoutProps = {
  title: "Đăng kí",
};
