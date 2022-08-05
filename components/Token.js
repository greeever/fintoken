import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {useAccount} from 'wagmi'
let texx
const truncateAddress = (address) => {
    // This help solves the null error
    if (address == null) return '';
    return address.slice(0, 6) + "..." + address.slice(-6);
  };
 


const Token = ({ copyText }) => {
   
    const {address} = useAccount()
    const [copyAddress, setCopyAddress] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const add = address === undefined ?  'no ref' : address 
    // texx = `https://fumesminer/#/${add}`


    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
      }


       // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }


    return (
        <>
        <div className="p-2 rounded-lg bg-white">
        <article
  className="flex items-center justify-between py-2 border rounded-lg border-gray-200 pb-2 px-1" 
>
  <div className="">
    <p  value={copyText} className="text-sm" />
        {!isCopied ? '0x89CF468E629DA4ED45692c10Da6Fe4Acc7E118fe' : 'Copied'}
  </div>

  <div className="inline-flex gap-2 p-1 bg-green-700 rounded text-green-50">


<div onClick={handleCopyClick}>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
</svg>
</div>

  </div>
</article>
        </div>
        </>
    )
}

export default Token;