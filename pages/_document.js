import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html className="dark" lang="en">
         <Head>
        {/* <title>Chase Finance</title> */}
            <meta name="description" content="Chase Protocol" />
            <link rel="icon" href="/logo.svg" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Ramaraja&display=swap" rel="stylesheet" />
    </Head>
        <body className="bg-gray-200 dark:bg-gray-800 text-gray-200 dark:text-gray-600">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument