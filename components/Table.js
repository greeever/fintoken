import { useState, useEffect, useMemo} from 'react'
import { Tab } from '@headlessui/react'
import { Contract,ethers } from 'ethers'
import KnotPool  from '../abis/KnotPool.json'
import {erc20ABI, useAccount, useSigner} from 'wagmi'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const token = '0xf459685b803cdb63d9230079159b0614f4f49dc4'
const Knot_Address = '0xeD1cd612b81D878a03a5839BB0B57e5768062119'

const Table = () => {

    const [{ data: accountData }] = useAccount({
        fetchEns: true,
      })
      const [{ data: signer }] = useSigner()


      const [isAllowance, setAllowance] = useState('0');
    const [isPrice, setPrice] = useState('0')
    const [isKdStake, setKdStake] = useState('')

    const [isUnstakeKd, setUnStakeKd] = useState('')


        async function getBalance () {
            if (! accountData) return null
            try {
                let provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
                let Kd =  new  Contract(token, erc20ABI, provider);
                let tx = await Kd.balanceOf(accountData.address)
                let tsz = await Kd.allowance(accountData.address, Knot_Address)
                console.log(tsz)
                setPrice(ethers.utils.formatEther(tx))
                setAllowance(ethers.utils.formatEther(tsz))
            } catch (error) {
                console.log('this is an error', error)
            }
        }

        

        

        async function approveLido () {
            if(!accountData.address) return null;
            try {
                // let provider = await new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
                // let signer = await provider.getSigner(accountData)
                let Kd = await new  Contract(token, erc20ABI, signer);
                let amount = await ethers.utils.parseEther('10000000000')
                console.log(amount)
                const response = await Kd.approve(Knot_Address, amount);
                console.log('this is approve', response);
            } catch (error) {
                console.log('this is approve error', error)
            }
        }

        async function StakeKd(_amount) {
            // if (_amount <= 0 && !accountData.address)  return null;
            try {
                let knot = await new  Contract(Knot_Address, KnotPool.abi, signer);
                let response = await knot.depositKdToken(_amount);
                let hash = response.hash
                setKdStake('')
                toast.success(`check transaction hash here https://etherscan.io/${hash}`)
                console.log(response); 
            } catch (error) {
                toast.error('Could not stake, please make sure yo have enough coins')
                console.log('this is deposit error', error)
            }
            } 

            async function unStakeKd(){
                try {
                    let knot = await new  Contract(Knot_Address, KnotPool.abi, signer);
                    let response = await knot.withdrawKdToken();
                    let hash = response.hash
                    toast.success(`check transaction hash here https://etherscan.io/${hash}`)
                setUnStakeKd('')
                } catch (error) {
                    toast.error('Could not unstake, please deposit first')
                    console.log('this is withdraw Kd error', error)
                }
            }

            async function getMax() {

                return setKdStake(isPrice)
            }


    useEffect(() => {
        getBalance () 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[accountData])

    return (
        <>
        <div className='my-8'>
            <Tab.Group>
                <Tab.List className="flex justify-around items-center px-6 py-4 bg-slate-100 my-5 rounded-xl h-16 ">
                    <Tab className={({selected}) => selected? "px-5 py-1 font-bold text-2xl text-white rounded-xl bg-purple-500"
                    :
                    " px-5 py-1 font-bold text-2xl rounded-xl text-purple-800"
                    }>Stake</Tab>
                    <Tab disabled={!accountData} className={({selected}) => selected? "px-5 py-1 font-bold text-2xl text-white rounded-xl bg-purple-500"
                    :
                    " px-5 py-1 font-bold text-2xl rounded-xl text-purple-800"
                    }>Unstake</Tab>
                </Tab.List>
                <Tab.Panels className="text-center">
                    <Tab.Panel className="">
                        <div className='w-full '>
                            {isAllowance > 0 ?

                            (<form 
                            onSubmit={(e) =>{
                                e.preventDefault()
                                let _amount = isPrice 
                                _amount = ethers.utils.parseEther(_amount);
                                StakeKd(_amount)
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
                                    <button onClick={getMax} className=' text-purple-600 font-bold p-1 bg-purple-100 rounded-lg'>max</button>
                                </span>
                                
                                </div >
                                <button type='submit'  className='my-10 mx-6 py-3 px-5 bg-purple-600 rounded-lg  w-2/3 md:w-3/6'>Stake</button>
                                </form>) :
                                (
                                <div>
                                    <h1 className='text-left font-bold font-sans text-3xl my-4'>Staking Overview</h1>
                                    <p className='font-mono font-xl text-left font-semibold pt-4'>Stake your LD to gain access to USDC Yield Pool while Earning staking rewards on your LD.
                                         The more LD you lockup, the more USDC you can deposit to earn passive income</p>
                                    <button onClick={approveLido} className=' text-center my-10 mx-6 py-3 px-5 bg-purple-600 rounded-lg  w-2/3 md:w-3/6'>Approve</button>
                                </div>
                                )
                            }
                                
                            
                        </div>
                    </Tab.Panel>
                    <Tab.Panel><p className='font-mono font-xl text-left font-semibold pt-4'>Lido applies a 10% fee on a user’s staking rewards. This fee is split between node operators, the DAO, and a coverage fund.</p>
                                    <button onClick={unStakeKd} className=' text-center my-10 mx-6 py-3 px-5 bg-purple-600 rounded-lg  w-2/3 md:w-3/6'>Claim</button></Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>

        <div>
            <div className='flex justify-around items-center my-8'>
            <h1 className='font-serif text-semibold'>Lido statistics :</h1>
            <a target="_blank" href="https://etherscan.io/token/0x9ee91F9f426fA633d227f7a9b000E28b9dfd8599" rel="noopener noreferrer" className=' underline cursor-pointer'>
                <p className='text-purple-500 underline'>View on Etherscan</p>
                </a>
            </div>
            <div className='flex justify-between items-center px-4 py-6 bg-purple-200 rounded-xl '>
            </div>
        </div>
        </>
    );
}

export default Table