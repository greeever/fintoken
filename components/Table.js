import { useState, useEffect, useMemo} from 'react'
import { Tab } from '@headlessui/react'
import { Contract,ethers } from 'ethers'
import LidoPool  from '../abis/LidoPool.json'
import Ido  from '../abis/Ido.json'
import {erc20ABI, useAccount, useSigner} from 'wagmi'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const IdoAddress = '0x5015D2ed2a861d1FDf66505Bdd4aAD7CE34B646e'
const token = '0xEe81Bde5cf32730b6627f61096fb6Cc07E0A962A'
const Knot_Address = '0x08F285104dBF45D89EaA487eDc21FA2D92B04a46'
let provider = new ethers.providers.JsonRpcProvider('https://rpc-mainnet.maticvigil.com/')

const Table = () => {

    const [{ data: accountData }] = useAccount({
        fetchEns: true,
      })
      const [{ data: signer }] = useSigner()



      const [isAllowance, setAllowance] = useState('');
      const [isPrice, setPrice] = useState('0')
    const [isKdStake, setKdStake] = useState('')
    const [isBalance, setBalance] = useState('0.00')
    const [isPending, setPending] = useState(0)
    const [isLoading, setLoading] = useState(false)
    const [isSux, setSux] = useState(false)
    const [isShow, setShow] = useState(false)

    async function pend() {
        try {
                
            let Kd = await  new  Contract(Knot_Address, LidoPool.abi, provider);
            let pending = await Kd.PendingReward()
            setPending(ethers.utils.formatEther(pending))
            console.log(Kd)

        } catch (error) {
            console.log('this is an eroor for allowance', error)
        }
    }

        async function getAllowance () {  
            try {
                
                let Kd =  new  Contract(token, erc20ABI, provider);
                let tsz = await Kd.allowance(accountData.address, Knot_Address)
                console.log(tsz)
                setAllowance(ethers.utils.formatEther(tsz))
            } catch (error) {
                console.log('this is an eroor for allowance', error)
            }
        }

        async function getBalance () {
            try {
                
                let Kd =  new  Contract(token, erc20ABI, provider);
                let tx = await Kd.balanceOf(accountData.address)
                setBalance(ethers.utils.formatEther(tx))
            } catch (error) {
                console.log('this is an error for balance', error)
            }
        }

        async function approveLido () {
            if(!accountData.address) return null;
            try {
                setLoading(true)
                let Kd = await new  Contract(token, erc20ABI, signer);
                let amount = await ethers.utils.parseEther('99999999999')
                console.log(amount)
                const response = await Kd.approve(Knot_Address, amount);
                hash = response.hash
                setLoading(false)
                toast.success('Transaction successful')
                console.log('this is approve', response);
            } catch (error) {
                setLoading(false)
                toast.error('Could not Approve')
                console.log('this is approve error', error)
            }
        }

        async function StakeKd() {
            // if (_amount <= 0 && !accountData.address)  return null;
            try {
                setLoading(true)
                let knot = await new  Contract(Knot_Address, LidoPool.abi, signer);
                let amount = ethers.utils.parseEther(isKdStake.toString());
                let response = await knot.depositKdToken(amount);
                 hash = response.hash
                setKdStake('')
                setLoading(false)
                toast.success('Transaction successful')
                console.log(response); 
            } catch (error) {
                setLoading(false)
                toast.error('Could not stake, please make sure yo have enough coins')
                console.log('this is deposit error', error)
            }
            } 

            async function unStakeKd(){
                try {
                    setLoading(true)
                    let knot = await new  Contract(Knot_Address, LidoPool.abi, signer);
                    let response = await knot.withdrawKdToken();
                    let hash = response.hash
                    setLoading(false)
                    setSux(true)
                    setShow(true)
                    toast.success('Transaction successful')
                setUnStakeKd('')
                } catch (error) {
                    setLoading(false)
                    setSux(true)
                    setShow(true)
                    toast.error('Could not unstake, please deposit first')
                    console.log('this is withdraw Kd error', error)
                }
            }

            async function getMax() {
                try {
                    let Kd =  new  Contract(token, erc20ABI, provider);
                    let tx = await Kd.balanceOf(accountData.address)
                     setPrice(ethers.utils.parseEther(tx))
                } catch (error) {
                    console.log('this is an error for max', error)
                }
            }
            // const max = getMax().then(() =>{
            //     setPrice(max)
            // })

            function calcaPercent() {
                const percentCalculation = (isKdStake * 35).toFixed(2);
                return percentCalculation;
              }
              const estimatedValue = calcaPercent();

    useEffect(() => {
        if (! accountData && isBalance) return null
        getBalance () 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[accountData])
    useEffect(() => {
        pend () 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[accountData])
    useEffect(() => {
        if (! accountData ) return null
        getAllowance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[accountData])


        
    return (
        <>
        <div className='my-8'>
        <div>
                                    <h1 className='text-left font-bold font-sans text-3xl my-4 text-white'>Staking Overview</h1>
                                    <p className='font-mono font-xl text-left font-semibold pt-4 text-white'>Stake your $LIFI to gain access to USDC Yield Pool while Earning staking rewards on your $LIFI.
                                         The more $LIFI you lockup, the more USDC you can deposit to earn passive income</p>
                                </div>
            <Tab.Group>
                <Tab.List className="flex justify-around items-center  py-4  my-5 rounded-xl h-16 bg-gray-500">
                    <Tab className={({selected}) => selected? "w-1/2 py-1 font-bold text-2xl text-white rounded-xl bg-purple-500"
                    :
                    " px-5 py-1 font-bold text-2xl rounded-xl text-purple-800"
                    }>Stake</Tab>
                    <Tab disabled={!accountData} className={({selected}) => selected? "w-1/2 py-1 font-bold text-2xl text-white rounded-xl bg-purple-500"
                    :
                    " px-5 py-1 font-bold text-2xl rounded-xl text-purple-800"
                    }>Unstake</Tab>
                </Tab.List>
                <Tab.Panels className="text-center mx-auto py-3 border-2 border-purple-600 bg-gray-500 shadow-xl rounded-xl">
                    <Tab.Panel className="">
                        <div className='w-full '>
                           <div className='flex items-center justify-between py-4 px-4'>
                               <p className='text-lg font-sans font-normal text-white'>Balance:</p>
                               <p className='text-sm font-sans font-light text-white'>{isBalance}</p>
                           </div>
                           {isAllowance > 0 ?
                                (
                           <form 
                            onSubmit={(e) =>{
                                e.preventDefault()                            
                                StakeKd()
                              }}
                            >
                                <div className='flex justify-between items-center p-3 border-2 border-gray-200 rounded-xl'>
                                <svg width="89" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.005 0l4.949 7.748-4.949 2.884-4.948-2.884L7.005 0zM3.572 7.381l3.433-5.376 3.434 5.376-3.434 2.002L3.572 7.38z" fill="#00A3FF"></path>
                    <path d="M6.998 12.335L1.258 8.99l-.157.245a6.999 6.999 0 1011.796 0l-.157-.245-5.742 3.346z" fill="#00A3FF"></path>
                    </svg>
                                <span className=''>
                                    <input className='shadow-none outline-none p-1 py-3 rounded-xl' placeholder='100' 
                                    value={isKdStake} onChange={(e) =>setKdStake(e.target.value)}
                                    />
                                </span>
                                <span className='ml-2'>
                                    <p onClick={getMax} className=' text-purple-600 font-bold p-1 bg-purple-100 rounded-lg'>max</p>
                                </span>
                                
                                </div >
                               
                                <button disabled={isLoading} type='submit'  className='font-semibold text-xl text-white my-10 mx-6 py-3 px-5 bg-purple-600 rounded-lg  w-2/3 md:w-3/6'>{isLoading ? 'Loading...' : 'Stake Liquidity'}</button>
                                </form>
                                 ) :
                                 ( <div className=''>
                                 <button disabled={isLoading} onClick={approveLido} className='font-semibold text-xl text-white text-center mt-10 mb-6 mx-6 py-3 px-5 bg-purple-600 rounded-lg  w-2/3 md:w-3/6'>{isLoading ? 'Loading...' : 'Approve'}</button>
                                 <p className='text-red-200 text-base pb-2'>Only approve once, if no change please refresh page</p>
                                 </div>
                                 )}
                                <div className=''>
                                <div className='flex items-center justify-between py-2 px-4'>
                                    <p className='text-lg font-sans font-normal text-white'>You&apos;ll receive:</p>
                                    <p className='text-sm font-sans font-light text-white'>{estimatedValue}</p>
                                </div>
                                <div className='flex items-center justify-between py-2 px-4'>
                                    <p className='text-lg font-sans font-normal text-white'>Liquidity Mining Apy:</p>
                                    <p className='text-sm font-sans font-light text-white'>35%</p>
                                </div>
                                <div className='flex items-center justify-between py-2 px-4'>
                                    <p className='text-lg font-sans font-normal text-white'>No of Stakers:</p>
                                    <p className='text-sm font-sans font-light text-white'>264</p>
                                </div>
                                <div className='flex items-center justify-between py-2 px-4'>
                                    <p className='text-lg font-sans font-normal text-white'>Total Staked:</p>
                                    <p className='text-sm font-sans font-light text-white'>5568129.8083 MATIC</p>
                                </div>
                            </div>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                    <div className='flex items-center justify-between py-4 px-4'>
                               <p className='text-lg font-sans font-semibold text-white '>Claim Liquidity:</p>
                               <p className='text-lg font-sans font-semibold text-white'>{isPending}</p>
                           </div>
                        <p className='font-mono font-xl text-left font-semibold pt-4 text-white'>Lido applies a 10% fee on a user’s staking rewards. This fee is split between node operators, the DAO, and a coverage fund.</p>
                                    <button disabled={isLoading} onClick={unStakeKd} className='font-semibold text-xl text-white text-center my-10 mx-6 py-3 px-5 bg-purple-600 rounded-lg  w-2/3 md:w-3/6'>{isLoading ? 'Loading...' : 'Claim Liquidity'}</button></Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>

        <div>
            <div className='flex justify-around items-center my-8'>
            <h1 className='font-serif text-semibold text-white'>Lido statistics :</h1>
            <a target="_blank" href="https://etherscan.io/token/0x9ee91F9f426fA633d227f7a9b000E28b9dfd8599" rel="noopener noreferrer" className=' underline cursor-pointer'>
                <p className='text-purple-500 underline'>View on polygonscan</p>
                </a>
            </div>
            <div className='flex justify-between items-center px-4 py-6  rounded-xl '>
            </div>
        </div>
        </>
    );
}

export default Table