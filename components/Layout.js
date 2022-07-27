import {useState, useEffect, useContext} from 'react'
import { useRouter } from 'next/router';
import {ethers, Contract, utils, BigNumber} from 'ethers'
import {useAccount, useSigner, useProvider} from 'wagmi'
import { Tab } from '@headlessui/react'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from 'react-toastify';

// import CdTimerComp from "./CdTimerComp";
import Presale from '../abi/Presale.json'
const IdoAddress = '0x8b3cd5a1e6776ea1c112dfb1b701cd1fcac574a0'
//token 0x3b118415e2E261ea1A62C20eA7f1118fd47FAfB2
// token bsc 0x187dDc0DCd7bB259E9E9884899383F2a527d7a61
let texx
const truncateAddress = (address) => {
    // This help solves the null error
    if (address == null) return '';
    return address.slice(0, 3) + "..." + address.slice(-2);
  };
//   let provider = new ethers.providers.JsonRpcProvider('https://rpc-mainnet.maticvigil.com/')
const Layout = () => {
    const notify = () => toast("Wow so easy!");
    
    const { asPath } = useRouter();
    let [isOpen, setIsOpen] = useState(false)
    const [isLoading, setLoading] = useState(false);
    const [isBuyLoading, setBuyLoading] = useState(false);
    const [isClaimLoading, setClaimLoading] = useState(false);
    const [isAmount, setAmount] = useState();
    const [isReferralCount, setReferralCount] = useState(0)
    const [isReferralReward, setReferralReward] = useState(0)
    const [isContribution, setContribution] = useState(0)
    const [isRate, setRate] = useState(0)
    const [copyAddress, setCopyAddress] = useState(false);
const [isMessage, setMessage] = useState('')
const [isTx, setTx] = useState('');
const [isClaimTx, setClaimTx] = useState('');
    const { data : accountData} = useAccount()
      const { data: signer } = useSigner()
    //   const provider = useProvider()
     

    const init = async () => {
        try {
            if (accountData) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // const chain = await provider.getNetwork()
        // console.log('this is chain', chain.chainId)
        const contract = await new Contract(IdoAddress, Presale.abi, provider);
        const refReward = await contract.referralRewards(accountData?.address)
        const refCount = await contract.referralCount(accountData?.address)
        const buyRate = await contract.rateOfTokensToGivePerEth()
        const contribute = await contract.contributions()

        setReferralReward( ethers.BigNumber.from(refReward).toNumber())
        setReferralCount( ethers.BigNumber.from(refCount).toNumber())
        setRate( ethers.BigNumber.from(buyRate).toNumber())
        setContribution(utils.formatEther(contribute))
    }
        } catch (error) {
            console.log('this is load presale read error', error)
        }
    }

    useEffect(() => {
        if(accountData) {
            init()
        }
    },[accountData])



    texx = `https://chasefinance.io#/${accountData.address}`
    // useEffect(()=>{

    //     try {
    //         const hash = asPath.split('#/')[1];
    //         setReferralAddress(hash)
    //         // console.log(hash)
    //     } catch (error) {
    //         // console.log('hash error', error)
    //     }
       
    //    }, [ asPath ]);


    async function buy () {
        // if(!provider.getSigner(account)) return null
        try {
            setBuyLoading(true)
            let referralAddress =  await asPath.split('#/')[1];
            if (!referralAddress || referralAddress.length !== 42) {
                referralAddress = '0x0000000000000000000000000000000000000000'
            }
            if (isAmount < 0.1 ) {
                setMessage('Amount lower than minimum, minimum 0.1')
            }
            if (referralAddress === accountData?.address) {
                setMessage("You're referring self? No referral rewards for you")
              }

            let amount = ethers.utils.parseEther(isAmount.toString());
            let contract = await new Contract(IdoAddress, Presale.abi, signer)
      
            let response = await contract.buy(referralAddress.toString(),{value: amount});
            let hash = response.hash
            setTx(hash)
            toast.success('Transaction succesful. Check bscscan')
        } 
        catch (error) {
            setBuyLoading(false)
            toast.error('Error. Something went wrong')
        }
    }


    async function claim () {
        try {
            setClaimLoading(true)
            const contract = await new Contract(IdoAddress, Presale.abi, signer);
            let response = await contract.withdrawEarnings();
            toast.success('Transaction sucessful. Check wallet')
            let hash = response.hash
            setClaimTx(hash)
        } catch (error) {
            toast.error('Transaction Fail. Talk to support ')
            setClaimLoading(false)
        }
    }

    function calcaPercent() {
        const percentCalculation = (isAmount * 10000).toFixed(2);
        return percentCalculation;
      }
      const estimatedValue = calcaPercent();

    return (
        <>
        {/* <CdTimerComp /> */}
        {/* ETH BALANCE */}
            {/* <div className=" w-11/12 bg-gray-100 max-w-3xl mx-auto dark:bg-gray-900 border-gray-300 dark:border-gray-600 border-2 mt-8 rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-800"> */}
                {/* <div className="py-4"> */}

                    {/* <div className="flex  justify-between px-8 pt-4 pb-2 text-gray-800 dark:text-gray-100">
                        <div className=''>
                        <p>Your token Balance :</p>
                        </div>     
                        <p>0</p>
                    </div> */}
                    
                    {/* <div className="flex  justify-between px-8 pt-4 pb-2 text-gray-800 dark:text-gray-100">
                        <div className=''>
                        <p>Your BNB Deposit :</p>
                        </div>     
                        <p>{isContribution}</p>
                    </div> */}

                    {/* <div className="flex  justify-between px-8 pt-4 pb-2 text-gray-800 dark:text-gray-100">
                        <div className=''>
                        <p>Total Presale Token :</p>
                        </div>     
                        <p>10M</p>
                    </div> */}
                {/* </div> */}
            {/* </div> */}


        <div className=" w-11/12 bg-gray-100 max-w-3xl mx-auto dark:bg-gray-900 border-gray-300 dark:border-gray-600 border-2 mt-8 rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-800 py-10">

      
            <Tab.Group>
            <div className=" w-11/12 bg-gray-100 md:max-w-3xl mx-auto dark:bg-gray-900 border-gray-300 dark:border-gray-600 border-2 rounded-xl ">
                <Tab.List className="flex justify-around items-center  rounded-xlbg-gray-500 w-full">
                    <Tab className={({selected}) => selected? "w-1/2  rounded-xl bg bg-gray-800 p-2 text-gray-200 dark:text-gray-100 font-serif text-xl"
                    :
                    "w-1/2  rounded-xl bg-gray-200 p-2 text-gray-800 font-serif text-xl"
                    }>Buy</Tab>
                    <Tab  className={({selected}) => selected? "w-1/2 rounded-xl bg-gray-800 p-2 text-gray-200 dark:text-gray-100 font-serif text-xl"
                    :
                    "w-1/2 rounded-xl bg-gray-200 p-2 text-gray-800 font-serif text-xl"
                    }>Claim</Tab>
                </Tab.List>
        </div>
                <Tab.Panels>
                    <Tab.Panel>
                    <div className=" w-11/12 bg-gray-100 md:max-w-3xl mx-auto dark:bg-gray-900 border-gray-300 dark:border-gray-600 border-2 mt-8 rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-800 ">
                        <div className='text-center pt-8'>

                            
                           <form className='w-full md:w-3/5 dark:text-gray-100 py-4 mx-auto'
                            onSubmit={(e) =>
                                {
                                e.preventDefault()
                                  buy()
                                }}
                           >
                                <div className='flex items-center justify-between pb-4 px-2 mx-auto'>
                                    <img src='/logo.svg' className='w-5 h-5' />
                                    <input className='placeholder:pl-4 placeholder:text-black dark:placeholder:text-gray-300 dark:focus:bg-gray-800 bg-gray-200 border-2 border-gray-200 leading-tight focus:outline-none focus:bg-gray-100 appearance-none text-gray-900 placeholder:text-sm placeholder:font-semibold p-3 flex-1 inline-flex text-sm rounded-r-md focus:ring-inset dark:border-gray-700 dark:text-gray-900 dark:bg-gray-800 focus:ring-gray-100 rounded-xl' placeholder='input amount'
                                     value={isAmount} onChange={(e) =>setAmount(e.target.value)}
                                    />

                                </div>
                                {isBuyLoading? 
                                (<button  type="button" className="px-3 border-2  bg-inherit border-gray-300 dark:border-gray-600 rounded-xl hover:border-gray-500 hover:shadow md:text-sm font-bold font-dmsans text-gray-700 dark:text-gray-100 md:mt-0 mt-4 h-12 flex items-center justify-center  hover:bg-blue-200 hover:dark:bg-gray-600  w-11/12  md:w-1/3 text-center cursor-pointer mx-auto">
                                <svg role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                                Loading...
                            </button>):
                            ( <button disabled={!accountData} type='submit' className='px-3 border-2  bg-inherit border-gray-300 dark:border-gray-600 rounded-xl hover:border-gray-500 hover:shadow md:text-sm font-bold font-dmsans text-gray-700 dark:text-gray-100 md:mt-0 mt-4 h-12 flex items-center justify-center  hover:bg-blue-200 hover:dark:bg-gray-600  w-11/12  md:w-1/3 text-center cursor-pointer mx-auto'>Deposit</button>)
                            }
                               {isMessage && <p className='text-red-600 pt-1 text-sm font-sans'>{isMessage} </p>}
                           </form>
                           
                           <div className='flex justify-center space-x-2 items-center w-10/12 mx-auto py-1'>
                            <p className=' text-gray-500 dark:text-gray-100 text-sm'>Output Amount:</p>
                            <p className=' text-gray-500 dark:text-gray-100 text-sm'>{estimatedValue > 0 ? estimatedValue : 0}</p>
                            </div>

                           <div className='flex justify-center space-x-2  items-center w-10/12 mx-auto py-1'>
                            <p className='text-gray-500 dark:text-gray-100 text-sm leading-tight'>Minimum:</p>
                            <p className='text-gray-500 dark:text-gray-100 text-sm'>0.1 BNB ~ $25</p>
                            </div>
                            {isTx &&
                            <div className='my-3 flex justify-center items-center'>
                                <a 
                                    target="_blank" rel="noopener noreferrer" 
                                href={`https://bscscan.com/tx/${isTx}`}
                                >
                                <p className='text-blue-800 underline text-lg font-medium'>View Explorer {truncateAddress(isTx)}
                                </p>
                                </a>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                </svg>
                            </div>
                            }
                        </div>
                        </div>
                       
                    </Tab.Panel>

                    <Tab.Panel>
                    <div className=" w-11/12 bg-gray-100 max-w-3xl mx-auto dark:bg-gray-900 border-gray-300 dark:border-gray-600 border-2 mt-8 rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-800 ">
                <div className="py-4">
                    <p className='text-sm font-sans leading-4 font-normal text-center text-gray-800  dark:text-gray-100'>Claim rewards here</p>
                    <div className="flex  justify-between px-8 pt-3 pb-2 text-gray-800 dark:text-gray-100">
                        <p>Your Referral Count:</p>    
                        <p>  {isReferralCount}</p>
                    </div>

                   <div className="flex  justify-between px-8 p2-3 pb-2 text-gray-800 dark:text-gray-100">
                        <p>Your token Rewards :</p>
                        <p>{isReferralReward}</p>
                    </div>
                    {isClaimLoading ? 
                    (<button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                    <svg role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    Loading...
                </button>):
                ( <button 
                    onClick={claim} 
                    className='px-3 border-2  bg-inherit border-gray-300 dark:border-gray-600 rounded-xl hover:border-gray-500 hover:shadow md:text-sm font-bold font-dmsans text-gray-700 dark:text-gray-100 md:mt-0 mt-4 h-12 flex items-center justify-center  hover:bg-blue-200 hover:dark:bg-gray-600  w-11/12  md:w-1/3 text-center cursor-pointer mx-auto'>Claim</button>)    
                }
                </div>
                {isClaimTx &&
                            <div className='my-3 flex justify-center items-center'>
                                <a 
                                    target="_blank" rel="noopener noreferrer" 
                                href={`https://bscscan.com/tx/${isClaimTx}`}
                                >
                                <p className='text-blue-800 underline text-lg font-medium'>View Explorer {truncateAddress(isClaimTx)}
                                </p>
                                </a>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                </svg>
                            </div>
                           }
            </div>
                  </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>


        <div className=' w-11/12 bg-gray-100 max-w-3xl mx-auto dark:bg-gray-900 border-gray-300 dark:border-gray-600 border-2 my-8 rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-800'>
            <div className="py-4 md:pl-8 text-center md:text-left flex flex-col items-center justify-center">
                <h1 className='py-3 text-gray-800 dark:text-gray-100'>Referral Code</h1>
                <p className='py-3 text-gray-800 dark:text-gray-100'>5% token reward when anyone deposit with your link</p>
                <p className='break-all  py-3 px-3 text-gray-800 dark:text-gray-100'>https://chasefinance.io#/{truncateAddress(accountData.address)}
                </p> 
            </div>
            {accountData && 
               <div className='flex justify-center mx-auto mb-3'>
                <CopyToClipboard
                    text={texx}
                    onCopy={() => {
                      setCopyAddress(true);
                      setTimeout(() => {
                        setCopyAddress(false);
                      }, 4000);
                    }}
                  >
                  {accountData ? 
                                   <button className='px-3 border-2  bg-inherit border-gray-300 dark:border-gray-600 rounded-xl hover:border-gray-500 hover:shadow md:text-sm font-bold font-dmsans text-gray-700 dark:text-gray-100 md:mt-0 mt-4 h-12 flex items-center justify-center  hover:bg-blue-200 hover:dark:bg-gray-600  w-11/12  md:w-1/3 text-center cursor-pointer'>{copyAddress ? 'copied' : 'copy'}</button>
                                   :
                            <p className='text-gray-800 dark:text-gray-100'>Connect wallet to get ref</p>
                  }  

                </CopyToClipboard>
                </div>
                }
        </div>

        <div className="w-11/12 max-w-3xl px-2  sm:px-0   mx-auto text-gray-800 dark:text-gray-100 mb-8 dark:bg-gray-900 border-gray-300 dark:border-gray-600 border-2 rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-800">
        <div className="flex  justify-between px-4 mb-4">
          <h1 className="text-lg font-semibold">Chase statistics</h1>
          <h2 className="font-normal text-base text-green-900 underline cursor-pointer"></h2>
        </div>
        <div className="px-4 py-6 mx-auto">
        <article
  className="flex items-end justify-between"
>
  <div>
    <p className="text-base text-gray-800 dark:text-gray-100">Token Name</p>
  </div>

  <p className="text-base ttext-gray-800 dark:text-gray-100">Chase</p>
</article>


        <article
  className="flex items-end justify-between pt-3" 
>
  <div>
    <p className="text-base text-gray-800 dark:text-gray-100">Token Symbol</p>
  </div>

<p className="
text-base text-gray-800 dark:text-gray-100">Chase</p>
</article>
        <article
  className="flex items-end justify-between pt-3" 
>
  <div>
    <p className="text-base text-gray-800 dark:text-gray-100">Token Decimal</p>
  </div>

<p className="
text-base text-gray-800 dark:text-gray-100">18</p>
</article>
        <article
  className="flex items-end justify-between pt-3" 
>
  <div>
    <p className="text-base text-gray-800 dark:text-gray-100">Token Address</p>
  </div>

<a
     target="_blank" rel="noopener noreferrer" 
     href='https://bscscan.com/token/0x7e06da6db356bab6d16091f9dc072f3af9c3389f'
>
<p className="
text-base text-blue-900 underline">0x7e06...389f</p>
</a>
</article>

<h1 className="text-lg font-semibold py-4 text-gray-800 dark:text-gray-100">Other statistics</h1>

<article
  className="flex items-end justify-between"
>
  <div>
    <p className="text-base text-gray-800 dark:text-gray-100">Presale Price </p>
  </div>

  <p className="text-base text-gray-800 dark:text-gray-100">0.003 chase/ $1</p>
</article>
<article
  className="flex items-end justify-between pt-3"
>
  <div>
    <p className="text-base text-gray-800 dark:text-gray-100">Listing Price </p>
  </div>

  <p className="text-base text-gray-800 dark:text-gray-100">0.009 chase/ $1</p>
</article>
        </div>
        </div>
        
        </>
    );
}

export default Layout;