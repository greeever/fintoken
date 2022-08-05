import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";


 


const Token = ({copyText}) => {
   
    const {address} = useAccount()
    const [copyAddress, setCopyAddress] = useState(false);
    const [isCopied, setIsCopied] = useState(false);


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
        <article className="flex items-end justify-between">
        <div>
    <p className="text-base text-gray-800 dark:text-gray-100 font-serif">
      Chase address </p>
  </div>
{isCopied ?
(
  <div onClick={handleCopyClick}>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
</svg>
</div>
) 
:
(
  <p className='text-base text-gray-800 dark:text-gray-100'>Copied!</p>
)
}
  

</article>
        </>
    )
}

export default Token;