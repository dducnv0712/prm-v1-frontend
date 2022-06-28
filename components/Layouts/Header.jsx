import React from "react";
import Head from "next/head";
const Header = (props) => {
  return (
    <Head>
      <title>{props.title} - Doppelherz Việt Nam</title>
      <link rel="canonical" href="https://doppelherz.vn/" />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Trang chủ" />
      <meta property="og:url" content="https://doppelherz.vn/" />
      <meta property="og:site_name" content="Doppelherz Việt Nam" />
      <meta
        property="article:publisher"
        content="https://www.facebook.com/DoppelherzVietnam"
      />
      <meta
        property="article:modified_time"
        content="2022-04-27T02:50:35+00:00"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:label1" content="Ước tính thời gian đọc" />
      <meta name="twitter:data1" content="6 phút" />
      <link
        rel="icon"
        href="https://doppelherz.vn/wp-content/uploads/2020/12/favicon.ico"
        sizes="32x32"
      />
      <link
        rel="icon"
        href="https://doppelherz.vn/wp-content/uploads/2020/12/favicon.ico"
        sizes="192x192"
      />
      <link
        rel="apple-touch-icon"
        href="https://doppelherz.vn/wp-content/uploads/2020/12/favicon.ico"
      />
      <meta
        name="msapplication-TileImage"
        content="https://doppelherz.vn/wp-content/uploads/2020/12/favicon.ico"
      />
    </Head>
  );
};

export default Header;
