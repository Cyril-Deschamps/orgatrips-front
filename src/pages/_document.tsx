import Document, { Html, Head, Main, NextScript } from "next/document";

import { AppConfig } from "../services/utils/AppConfig";

class MyDocument extends Document {
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head>
          <link
            href={"/static/favicon/apple-touch-icon.png"}
            rel={"apple-touch-icon"}
            sizes={"180x180"}
          />
          <link
            href={"/static/favicon/favicon-32x32.png"}
            rel={"icon"}
            sizes={"32x32"}
            type={"image/png"}
          />
          <link
            href={"/static/favicon/favicon-16x16.png"}
            rel={"icon"}
            sizes={"16x16"}
            type={"image/png"}
          />
          <link href={"/static/favicon/site.webmanifest"} rel={"manifest"} />
          <link
            color={"#000000"}
            href={"/static/favicon/safari-pinned-tab.svg"}
            rel={"mask-icon"}
          />
          <link href={"/static/favicon/favicon.png"} rel={"shortcut icon"} />
          <meta
            content={"/static/favicon/browserconfig.xml"}
            name={"msapplication-config"}
          />
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
