import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <title>Shandon Hicks</title> */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="icon" href="/favicon.ico" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atelier-cave-dark.min.css"/>

        </Head>
        <body className="bg-fixed bg-gradient-to-r from-blue to-white-500 dark:from-dark-500 dark:to-dark-700 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
