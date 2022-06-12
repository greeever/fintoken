import { useEffect, useState } from 'react'
import { useProvider, useAccount, useSigner, useDisconnect, useConnect} from 'wagmi'
import {ethers, utils, Contract} from 'ethers'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Holdings from '../abi/Holdings.json'
const HoldingsAddress = '0xcEe3E9De3f43263e8D23276ce22d9cFDCa539f3a'

const truncateAddress = (address) => {
    // This help solves the null error
    if (address == null) return;
    return address.slice(0, 6) + "..." + address.slice(-4);
  };


export default function Stats ({handleClick}) {

    const { data : accountData} = useAccount()
    const { data: signer } = useSigner()
    const { disconnect } = useDisconnect()
    const {
        activeConnector,
        connect,
        connectors,
        error,
        isConnecting,
        pendingConnector,
      } = useConnect()
    // const { datat: provider } = useProvider()
    const [isUserStake, setUserStake] = useState(0)
    // const [isUserRef, setuser] = useState(0)
    const [isUserRefCount, setUserRefCount] = useState(0)
    const [isUserReward, setUserReward] = useState(0)
    const [isUserEarn, setUserEarn] = useState(0)
    const [isUserAmount, setUserAmount] = useState(0)
    const [copyAddress, setCopyAddress] = useState(false);
    const init = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
                const contract = await new Contract(HoldingsAddress, Holdings.abi, provider)
                // console.log('This is Holdings read', contract)
                const userEarning = await contract.calculateEarnings(accountData?.address)
                const userStakes= await contract.stakes(accountData?.address)
                const refReward = await contract.referralRewards(accountData?.address)
                const refCount = await contract.referralCount(accountData?.address)
                const userReward = await contract.stakeRewards(accountData?.address)
                // const nativeReward = await contract.PendingReward(accountData?.address)
                // console.log('this is userstake', userActive)
                setUserEarn(ethers.BigNumber.from(userEarning).toNumber())
                setUserReward(ethers.BigNumber.from(refReward).toNumber())
                setUserRefCount(ethers.BigNumber.from(refCount).toNumber())
                setUserStake(ethers.BigNumber.from(userStakes).toNumber())
                setUserAmount(ethers.BigNumber.from(userReward).toNumber())
        } catch (error) {
            console.log('This is read',error)
        }
    }

    useEffect(() => {
        if (accountData) {
                 init()
        }
   
    })

    return(
        <>
         <div>
             <div className='flex justify-between items-center'>
                 <p className='text-center my-6 font-extrabold text-6xl text-gray-100'>${isUserStake}</p>
                <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
             </div>

             <div className='mx-auto mb-3'>
                 <p className='text-center text-gray-100 pb-4'>Address: {truncateAddress(accountData?.address)}</p>
                <CopyToClipboard
                    text={`proteafinance.io/${accountData?.address}`}
                    onCopy={() => {
                      setCopyAddress(true);
                      setTimeout(() => {
                        setCopyAddress(false);
                      }, 4000);
                    }}
                  >
                                   <p className='text-gray-100 underline px-2 md:text-sm font-bold  mmt-4 flex items-center justify-center text-center cursor-pointer'>{copyAddress ? 'copied Address' : 'click to copy referral link'}</p> 
                </CopyToClipboard>
                </div>

            <div className=" mb-10 bg-teal-700 border-2 border-orange-500 shadow-xl rounded-2xl p-2">
                <img className="h-6 w-6" src="/download.svg" />
                <div className='flex justify-between items-center'>
                <div>
                <p className="mt-2 text-white">{isUserEarn}</p>
                <p className="mt-2 text-white">Earnings</p>
                </div>
                <div className='border-l pl-2'>
                <p className="mt-2 text-white">{isUserAmount}</p>
                <p className="mt-2 text-white">Amount</p>
                </div>
                </div>
               
            </div>


            <div className="mb-10 bg-teal-700 border-2 border-orange-500 shadow-black px-3 py-4 rounded-2xl">
                <img className="h-6 w-6" src="/download.svg" />
                <div className="flex flex-row justify-between items-center">
                <div className=" ">
                <p className="mt-2">{isUserRefCount} BUSD</p>
                <p className="mt-2">Your Referral</p>
                </div>
                <div className="border-l pl-2">
                <p className="mt-2 text-white">{isUserReward} BUSD</p>
                <p className="mt-2 text-white">Total Rewards</p>
                </div>
                </div>
            </div>

            <button
            onClick={disconnect}
            className='mt-24 mb-12 border-2 border-orange-400 text-gray-100 w-full py-3 rounded-lg text-lg font-semibold font-sans'
            >Disconnect</button>
        </div>
        </>
    )
}