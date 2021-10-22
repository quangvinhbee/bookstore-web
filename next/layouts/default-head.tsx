import { DefaultSeo } from "next-seo";
import Head from "next/head";
import React from "react";

export function DefaultHead() {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=0"
        />
        <meta name="keywords" content="HTML, CSS, JavaScript" />
        <link rel="icon" type="image/png" href={"/favicon.ico"} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
    </>
  );
}
