import { NextSeo } from "next-seo";
import { DefaultHead } from "../default-head";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

export function DefaultLayout({ ...props }) {
  console.log(props);
  return (
    <div className="w-full">
      <DefaultHead />
      <NextSeo
        defaultTitle={"N17DCAT078"}
        title={props.title ? props.title : ""}
      />
      <Header />
      <div
        className="w-full h-full flex flex-col"
        style={{ minHeight: "calc(100vh - 96px)" }}
      >
        {props.children}
      </div>
      <Footer />
    </div>
  );
}
