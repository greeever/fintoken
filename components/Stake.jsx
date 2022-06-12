import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import {ethers, Contract, utils} from 'ethers'
import { useProvider, erc20ABI, useAccount, useSigner} from 'wagmi';
import Holdings from '../abi/Holdings.json'
const HoldingsAddress = '0xcEe3E9De3f43263e8D23276ce22d9cFDCa539f3a'
const BusdAddress = '0x947c850121d0Eb6523F7C7ae0b7bE339b71B28a0'
export default function Stake () {

  const [isLoading, setLoading] = useState(false);
  const [isBuyLoading, setBuyLoading] = useState(false);
  const [isSellLoading, setSellLoading] = useState(false);
  const [isClaimLoading, setClaimLoading] = useState(false);
  const [isRegLoading, setRegLoading] = useState(false)
  const [isAmount, setAmount] = useState();
  const [isWithdrawAmount, setWithdrawAmount] = useState();
  const [isRegistered, setRegistered] = useState(false);
  const [isAllowance, setAllowance] = useState(0)
  const [isMessage, setMessage] = useState('')
  const { data : accountData} = useAccount()
    const { data: signer } = useSigner()
   


  const init = async () => {
    if (accountData) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = await new Contract(HoldingsAddress, Holdings.abi, provider);
      console.log('this is presale read contract', contract);
      const registered = await contract.registered(accountData?.address)
      setRegistered(registered)
    }
  }

  const tokenReaf = async () => {
    if (accountData) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = await new Contract(BusdAddress, erc20ABI, provider);
      console.log('this is presale erc20 contract', contract);
      const rallow = await contract.allowance(accountData?.address, HoldingsAddress)
      setAllowance(ethers.utils.formatEther(rallow))
    }
  }

  useEffect(() => {
    init()
  },[])

  useEffect(() => {
    tokenReaf()
  },[])

  async function approval() {
    if (accountData) {
      try {
        const contract = await new Contract(BusdAddress, erc20ABI, signer);
        const response = await contract.approve(HoldingsAddress, ethers.constants.MaxUint256)
        let hash = response.hash
        console.log(hash)
      } catch (error) {
        console.log(error)
      }
     
    }
  }

  async function register() {
    if(!accountData) return null
    try {
      setRegLoading(true)
        let referralAddress =  await asPath.split('#/')[1];
        if (!referralAddress || referralAddress.length !== 42) {
            referralAddress = '0x0000000000000000000000000000000000000000'
        }
        if (isAmount < 100 ) {
            setMessage('Amount lower than minimum')
        }
        if (referralAddress === accountData?.address) {
            setMessage('Cannot refer self')
          }

        let amount = ethers.utils.parseEther(isAmount.toString());
        let contract = await new Contract(IdoAddress, Presale.abi, signer)
  
        let response = await contract.registerAndStake(amount, referralAddress.toString());
        let hash = response.hash
        setRegLoading(false)
        console.log(hash)
    } 
    catch (error) {
        setRegLoading(false)
        console.log('this is buy error',error)
    }
    setRegLoading(false)
}

async function stake() {
  if(!accountData) return null
      setBuyLoading(true)
  try {
      
      if (isAmount < 100 ) {
          setMessage('Amount lower than minimum')
      }
      let amount = ethers.utils.parseEther(isAmount.toString());
      let contract = await new Contract(IdoAddress, Presale.abi, signer)

      let response = await contract.stake(amount);
      let hash = response.hash
      console.log(hash)
  } 
  catch (error) {
      setBuyLoading(false)
      console.log('this is buy error',error)
  }
  setBuyLoading(false)
}


async function withdraw() {
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

    return (
        <>
        <div>
        <div className="mx-auto max-w-xl">

      
<Tab.Group>
<div className=" ">
    <Tab.List className="flex justify-around items-center py-2 px-2 rounded-xl bg-orange-500 w-full md:max-w-xl mt-10 space-x-1">
        <Tab className={({selected}) => selected? "w-1/2 rounded-lg  bg-teal-800 p-2 text-gray-200 dark:text-gray-100 font-serif text-2xl"
        :
        "w-1/2 text-2xl rounded-lg bg-gray-400 p-2  text-emerald-800 font-serif"
        }>DEPOSIT</Tab>
        <Tab  className={({selected}) => selected? "w-1/2 2xl rounded-lg bg-teal-800 p-2 text-gray-200 dark:text-gray-100 font-serif text-2xl"
        :
        "w-1/2 text-2xl rounded-lg  bg-gray-400 p-2 text-emerald-800  font-serif"
        }>WITHDRAW</Tab>
    </Tab.List>
</div>
    <Tab.Panels>
        <Tab.Panel>

        <div >
        <div className='flex justify-end items-center mb-2 mt-8  mt:mt-8 mb:8' >
             <p className="text-right text-gray-100 font-semibold text-xl">Balance</p>
             <div className='flex items-center pl-4'>
             <img className="h-4 w-4" src="/wallet.svg" />
             <p className='pl-2 text-gray-100'>$ 10</p>
             </div>
            </div>

            {isAllowance == 0 &&
            <div>
              <div className='max-w-1/3'>
              <div class="m mb-6">
    <div class="md:w-1/3 ">
      {/* <label class="block text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Enter Amount
      </label> */}
    </div>
    <div className="md:w-2/3 pt-3 mx-auto">
      <input
      value={isAmount}
      onChange={(e) =>setAmount(e.target.value)}
      className ="placeholder:text-lg placeholder:font-semibold bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-gray-100 focus:border-teal-500" type="number" placeholder='0.00' />
    </div>
    <div className='pt-10 md:w-2/3 mx-auto'>
      <div className=' pb-4 flex justify-between items-center text-gray-100'>
          <p>Estimated Average APR</p>
          <p>+9.04 %</p>
      </div>
      <div className='pb-4 flex justify-between items-center text-gray-100'>
          <p>Estimated Network Fees</p>
          <p>$ 0.50</p>
      </div>
      </div>
    </div>
    <button 
    //  disabled={!accountData}
     onClick={approval}
    className=' border-2 border-gray-400 text-gray-100 w-full py-3 rounded-lg text-lg font-semibold font-sans'
    type='submit'>Approve</button>
              </div>
            </div>
            }
            {!isRegistered && isAllowance > 0 && (

         <div className='max-w-1/3'>

         <form
         onSubmit={(e) =>
          {
          e.preventDefault()
            register()
          }}
         class="w-full mx-auto max-w-2xl">

             
  <div className="m mb-6">
    <div className="md:w-1/3 ">
      {/* <label class="block text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Enter Amount
      </label> */}
    </div>
    <div className="md:w-2/3 pt-3 mx-auto">
      <input
      value={isAmount}
      onChange={(e) =>setAmount(e.target.value)}
      className ="placeholder:text-lg placeholder:font-semibold bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-gray-100 focus:border-teal-500" type="number" placeholder='0.00' />
    </div>
    <div className='pt-10 md:w-2/3 mx-auto'>
      <div className=' pb-4 flex justify-between items-center text-gray-100'>
          <p>Estimated Average APR</p>
          <p>+9.04 %</p>
      </div>
      <div className='pb-4 flex justify-between items-center text-gray-100'>
          <p>Estimated Network Fees</p>
          <p>$ 0.50</p>
      </div>
      </div>
    </div>
    <div className='mx-auto  '>
    <button 
     disabled={!accountData}
    className=' border-2 border-gray-400 text-gray-100 w-full py-3 rounded-lg text-lg font-semibold font-sans'
    type='submit'>Deposit</button>
    </div>
  </form>
     <p className='mt-1 text-lg font-bold text-orange-500'>{isMessage}</p>
         </div>
         )}

         {isRegistered &&
                  <div className='max-w-1/3'>

                  <form
                  onSubmit={(e) =>
                   {
                   e.preventDefault()
                     stake()
                   }}
                  class="w-full mx-auto max-w-2xl">
         
                      
           <div classname="m mb-6">
             <div className="md:w-1/3 ">
               {/* <label class="block text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4">
                 Enter Amount
               </label> */}
             </div>
             <div className="md:w-2/3 pt-3 mx-auto">
               <input
               value={isAmount}
               onChange={(e) =>setAmount(e.target.value)}
               className ="placeholder:text-lg placeholder:font-semibold bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-gray-100 focus:border-teal-500" type="number" placeholder='0.00' />
             </div>
             <div className='pt-10 md:w-2/3 mx-auto'>
               <div className=' pb-4 flex justify-between items-center text-gray-100'>
                   <p>Estimated Average APR</p>
                   <p>+9.04 %</p>
               </div>
               <div className='pb-4 flex justify-between items-center text-gray-100'>
                   <p>Estimated Network Fees</p>
                   <p>$ 0.50</p>
               </div>
               </div>
             </div>
             <div className='mx-auto  '>
             <button 
             disabled={!accountData}
             className=' border-2 border-gray-400 text-gray-100 w-full py-3 rounded-lg text-lg font-semibold font-sans'
             type='submit'>Deposit</button>
             </div>
           </form>
              <p className='mt-1 text-lg font-bold text-orange-500'>{isMessage}</p>
                  </div>
         }
            </div>
        </Tab.Panel>

        <Tab.Panel>
        <div >
        <div className='flex justify-end items-center my-8' >
             <p className="text-right text-gray-100 font-semibold text-xl">Balance</p>
             <div className='flex items-center pl-4'>
             <img className="h-4 w-4" src="/wallet.svg" />
             <p className='pl-2 text-gray-100'>$ 10</p>
             </div>
            </div>

         <div className='max-w-1/3'>
         <form
          onSubmit={(e) =>
            {
            e.preventDefault()
              withdraw()
            }}
         class="w-full mx-auto max-w-2xl">

             
  <div className="m mb-6">
    <div className="md:w-1/3 ">
      {/* <label class="block text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Enter Amount
      </label> */}
    </div>
    <div className="md:w-2/3 pt-3 mx-auto">
      <input
      value={isWithdrawAmount}
      onChange={(e) =>setWithdrawAmount(e.target.value)}
      className ="placeholder:text-lg placeholder:font-semibold bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-gray-100 focus:border-teal-500" type="number" placeholder='0.00' />
    </div>
    <div className='pt-10 md:w-2/3 mx-auto'>
      <div className=' pb-4 flex justify-between items-center text-gray-100'>
          <p>Estimated Average APR</p>
          <p>+9.04 %</p>
      </div>
      <div className='pb-4 flex justify-between items-center text-gray-100'>
          <p>Estimated Network Fees</p>
          <p>$ 0.50</p>
      </div>
      </div>
    </div>
    <div className='mx-auto  '>
    <button 
     disabled={!accountData}
    className=' border-2 border-gray-400 text-gray-100 w-full py-3 rounded-lg text-lg font-semibold font-sans'
    type='submit'>Withdraw</button>
    </div>
  </form>
  <p className='my-1 text-lg font-bold text-orange-500'>{isMessage}</p>
         </div>
            </div>
      </Tab.Panel>
    </Tab.Panels>
</Tab.Group>
</div>

        </div>
        </>
    )
}