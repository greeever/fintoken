import {useState, useEffect, useContext} from 'react'
import { useRouter } from 'next/router';
import {ethers, Contract, utils, BigNumber} from 'ethers'
import {useAccount, useSigner} from 'wagmi'
import { Tab } from '@headlessui/react'
import { CopyToClipboard } from "react-copy-to-clipboard";
// import CdTimerComp from "./CdTimerComp";
import Presale from '../abi/Presale.json'

const IdoAddress = '0x4b08BDEED5E4797888F16E7F537B5A52Db35594E'
// const IdoAddress = '0xBB8F9a81E652AC2adF8731667Dda3F232b7cb789';
//token 0x3b118415e2E261ea1A62C20eA7f1118fd47FAfB2
// token bsc 0x187dDc0DCd7bB259E9E9884899383F2a527d7a61
let texx
const truncateAddress = (address) => {
    // This help solves the null error
    if (address == null) return;
    return address.slice(0, 3) + "..." + address.slice(-2);
  };
//   let provider = new ethers.providers.JsonRpcProvider('https://rpc-mainnet.maticvigil.com/')
const Layout = () => {


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
    const { data : accountData} = useAccount()
      const { data: signer } = useSigner()
     

    const init = async () => {
        try {
            if (accountData) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // const chain = await provider.getNetwork()
        // console.log('this is chain', chain.chainId)
        const contract = await new Contract(IdoAddress, Presale.abi, provider);
        console.log('this is presale read contract', contract);
        const refReward = await contract.referralRewards(accountData?.address)
        const refCount = await contract.referralCount(accountData?.address)
        const buyRate = await contract.rateOfTokensToGivePerEth()
        const contribute = await contract.contributions()

        setReferralReward( ethers.BigNumber.from(refReward).toNumber())
        setReferralCount( ethers.BigNumber.from(refCount).toNumber())
        setRate( ethers.BigNumber.from(buyRate).toNumber())
        setContribution(utils.formatEther(contribute))
        console.log(isContribution)
    
        console.log('ref count',  ethers.BigNumber.from(refCount).toNumber())
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
            setBuyLoading(true)
        try {
            let referralAddress =  await asPath.split('#/')[1];
            if (!referralAddress || referralAddress.length !== 42) {
                referralAddress = '0x0000000000000000000000000000000000000000'
            }
            if (isAmount < 0.1 ) {
                setMessage('Amount lower than minimum')
            }
            if (referralAddress === accountData?.address) {
                setMessage('Cannot refer self')
              }

            let amount = ethers.utils.parseEther(isAmount.toString());
            let contract = await new Contract(IdoAddress, Presale.abi, signer)
      
            let response = await contract.buy(referralAddress.toString(),{value: amount});
            let hash = response.hash
            console.log(hash)
        } 
        catch (error) {
            setBuyLoading(false)
            console.log('this is buy error',error)
        }
        setBuyLoading(false)
    }


    async function claim () {
        setClaimLoading(true)
        try {
            const contract = await new Contract(IdoAddress, Presale.abi, signer);
            let response = await contract.withdrawEarnings();
            toast.success('Sucessful. Check wallet')
            // let hash = response.hash
        } catch (error) {
            console.log('this is claim error', error)
            toast.error('Transaction Fail. Talk to support ')
        }
        setClaimLoading(false)
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
                                <div className='flex space-x-1 pb-4 px-2 mx-auto'>
                                    <span className='pl-0.5 inline-flex items-center px-3 pointer-events-none text-sm rounded-l-md dark:bg-gray-700 text-gray-800 dark:text-gray-100'>Chase</span>
                                    <img src='/logo.svg' className='w-2 h-2' />
                                    <input className='placeholder:pl-4 placeholder:textlg py-3 flex-1 inline-flex border text-sm rounded-r-md focus:ring-inset dark:border-gray-700 dark:text-gray-100 dark:bg-gray-800 focus:ring-violet-400 rounded-xl' placeholder='enter amount'
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
                               {isMessage && <p className='text-gray-800 dark:text-gray-100 pt-1 text-sm font-sans'>{isMessage} </p>}
                           </form>
                           <div className='flex justify-around items-center text-gray-800 dark:text-gray-100  w-10/12 mx-auto'>
                            <p className=' text-gray-800 dark:text-gray-100'>Estimated rewards:</p>
                            <p className=' text-gray-800 dark:text-gray-100'>{estimatedValue}</p>
                            </div>

                           <div className='flex justify-around items-center text-gray-800 dark:text-gray-100 w-10/12 mx-auto'>
                            <p className='text-gray-800 dark:text-gray-100'>Trade:</p>
                            <p className='text-gray-800 dark:text-gray-100'>Min 0.01 BNB</p>
                            </div>

                            <div className='mb-2 md:mb-4 flex justify-around items-center text-gray-800 dark:text-gray-100 w-10/12 mx-auto'>
                            <p className='py-3 text-gray-800 dark:text-gray-100'>Chase:</p>
                            <p className='py-3 text-gray-800 dark:text-gray-100'>100M ~ $150,000</p>
                            </div>
                        </div>
                        </div>
                       
                    </Tab.Panel>

                    <Tab.Panel>
                    <div className=" w-11/12 bg-gray-100 max-w-3xl mx-auto dark:bg-gray-900 border-gray-300 dark:border-gray-600 border-2 mt-8 rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-800 ">
                <div className="py-4">
                    <div className="flex  justify-between px-8 pt-3 pb-2 text-gray-800 dark:text-gray-100">
                        <div className=''>
                        <p>Your claimable Token:</p>
                        </div>     
                        <p>0</p>
                    </div>

                    <div className="flex  justify-between px-8 pt-3 pb-2 text-gray-800 dark:text-gray-100">
                        <div className=''>
                        <p>Your token Value :</p>
                        </div>     
                        <p>$1000</p>
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
            </div>
                  </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>


        <div className=' w-11/12 bg-gray-100 max-w-3xl mx-auto dark:bg-gray-900 border-gray-300 dark:border-gray-600 border-2 mt-8 rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-800'>
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

        <div className=" w-11/12 mb-4 bg-gray-100 max-w-3xl mx-auto dark:bg-gray-900 border-gray-300 dark:border-gray-600 border-2 mt-8 rounded-xl shadow-lg shadow-gray-200 dark:shadow-gray-800 ">
                <div className="py-4">

                    {/* <div className="flex  justify-between px-8 pt-3 pb-2 text-gray-800 dark:text-gray-100">
                        <div className=''>
                        <p>Your referral reward:</p>
                        </div>     
                        <p>
                            {isReferralReward}
                            </p>
                    </div> */}
                    <div className="flex  justify-between px-8 pt-3 pb-2 text-gray-800 dark:text-gray-100">
                        <div className=''>
                        <p>Your Referral Earned :</p>
                        </div>     
                        <p>
                            {isReferralCount}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Layout;