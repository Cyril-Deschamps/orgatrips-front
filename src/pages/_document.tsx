import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href={"assets/apple-touch-icon.png"}
            rel={"apple-touch-icon"}
            sizes={"180x180"}
          />
          <link
            href={"assets/favicon-32x32.png"}
            rel={"icon"}
            sizes={"32x32"}
            type={"image/png"}
          />
          <link
            href={"assets/favicon-16x16.png"}
            rel={"icon"}
            sizes={"16x16"}
            type={"image/png"}
          />
          <link href={"assets/site.webmanifest"} rel={"manifest"} />
          <link
            color={"#5bbad5"}
            href={"assets/safari-pinned-tab.svg"}
            rel={"mask-icon"}
          />
          <meta content={"#da532c"} name={"msapplication-TileColor"} />
          <meta content={"#ffffff"} name={"theme-color"} />
          <meta content={"#000"} name={"theme-color"} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
