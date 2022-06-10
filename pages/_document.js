import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html className="" lang="en">
         <Head>
            <meta name="description" content="Protea Finance" />
            <link rel="icon" href="/poollogo.svg" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Ramaraja&display=swap" rel="stylesheet" />
    </Head>
        <body className="bg-teal-900 text-black font-sans">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument