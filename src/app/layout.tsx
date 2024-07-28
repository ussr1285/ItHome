import type { Metadata } from "next";
import "./globals.css";

import Header from "@core/Header/Desktop/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import ErrorBoundaryWrapper from "./ErrorBoundaryWrapper";
// import { MobileHeader } from "./_PageComponents/MobileHeader";

export const Mobile = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery("(max-width:743px)");
  return isMobile ? children : null;
};
export const Desktop = ({ children }: { children: React.ReactNode }) => {
  // const isDesktop = useMediaQuery("(min-width:744px)");
  const isDesktop = true;
  return isDesktop ? children : null;
};

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*<Desktop>*/}

      {/*</Desktop>*/}
      {/*<Mobile>
        <MobileHeader />
  </Mobile>*/}
      <head>
        <meta charSet="utf-8" />

        <link rel="icon" href="/svgs/logo.svg" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:title" content="ItHome | 저렴한 방을 찾아보세요." />

        <meta
          property="og:image"
          content={`${process.env.PUBLIC_URL}/image.png`}
        />
        <meta property="og:url" content="https://ithomes.kr" />
        <meta property="og:type" content="website" />

        <title>ItHome</title>
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS}&autoload=false`}
        ></script>
        <script
          defer
          type="text/javascript"
          src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"
          charSet="utf-8"
        ></script>
        <script
          defer
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.0/kakao.min.js"
          integrity="sha384-l+xbElFSnPZ2rOaPrU//2FF5B4LB8FiX5q4fXYTlfcG4PGpMkE1vcL7kNXI6Cci0"
          crossOrigin="anonymous"
        ></script>
        <script
          defer
          type="text/javascript"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVERMAP_API_KEY}&submodules=geocoder`}
        ></script>
      </head>
      <body>
        <Header />
        <div className="container mx-auto px-8">
          <ErrorBoundaryWrapper>{children}</ErrorBoundaryWrapper>
        </div>
      </body>
    </html>
  );
}
