import { useState, useEffect, useMemo} from 'react'
import { Tab } from '@headlessui/react'
import { Contract,ethers } from 'ethers'
import KnotPool  from '../abis/KnotPool.json'
import {erc20ABI, useAccount, useSigner} from 'wagmi'
const token = '0xf459685b803cdb63d9230079159b0614f4f49dc4'
const address = '0xe6402f8adc9dd5909602a25ea5c5b7d2528a62a2'
const Knot_Address = '0xeD1cd612b81D878a03a5839BB0B57e5768062119'


const Table = () => {

    const [{ data: accountData }] = useAccount({
        fetchEns: true,
      })
      const [{ data: signer }] = useSigner()


      const [isAllowance, setAllowance] = useState('0');
    const [isPrice, setPrice] = useState('0')
    const [isKdStake, setKdStake] = useState('')
    const [isTotalKd, setTotalKd] = useState()
    const [isUnstakeKd, setUnStakeKd] = useState()


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

        async function ReadKnot () {
            if (! accountData) return null
            try {
                let provider = await new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
                let knot = await new  Contract(Knot_Address, KnotPool.abi, provider)
                let tx  = await knot.TotalKdCoin()
                setTotalKd(ethers.utils.formatEther(tx))
            } catch (error) {
                console.log('this is total error', error)
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
                const response = await knot.depositKdToken(_amount);
                console.log(response); 
                setKdStake('')
            } catch (error) {
                console.log('this is deposit error', error)
            }
            } 

            async function unStakeKd(_amount){
                try {
                    let knot = await new  Contract(Knot_Address, KnotPool.abi, signer);
                    const response = await knot.withdrawKdToken(_amount);
                    console.log(response); 
                setUnStakeKd('')
                } catch (error) {
                    console.log('this is withdraw Kd error', error)
                }
            }



    useEffect(() => {
        getBalance () 
        ReadKnot()
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
                                <span className=' '>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C18.6271 0 24 5.37288 24 12C24 18.6271 18.6269 24 12 24C5.37312 24 0 18.6286 0 12C0 5.37144 5.37216 0 12 0Z" fill="#7B3FE4"></path><path d="M15.9842 9.27698C15.8327 9.18968 15.6609 9.14372 15.4861 9.14372C15.3112 9.14372 15.1394 9.18968 14.988 9.27698L12.7025 10.6385L11.1495 11.5264L8.86405 12.8879C8.71256 12.9752 8.54079 13.0212 8.36594 13.0212C8.1911 13.0212 8.01933 12.9752 7.86784 12.8879L6.05119 11.8224C5.90212 11.7334 5.77816 11.6079 5.69102 11.4577C5.60387 11.3075 5.5564 11.1376 5.55307 10.9641V8.8626C5.55018 8.68775 5.59503 8.51543 5.6828 8.36418C5.77058 8.21293 5.89794 8.08849 6.05119 8.00426L7.83854 6.96832C7.99003 6.88102 8.16181 6.83507 8.33666 6.83507C8.51151 6.83507 8.68329 6.88102 8.83478 6.96832L10.6221 8.00426C10.7712 8.09328 10.8951 8.21879 10.9823 8.36896C11.0694 8.51913 11.1169 8.68901 11.1202 8.8626V10.2241L12.6732 9.30657V7.94504C12.6761 7.7702 12.6312 7.59787 12.5434 7.44663C12.4557 7.29538 12.3283 7.17094 12.1751 7.0867L8.86405 5.13325C8.71256 5.04595 8.54079 5 8.36594 5C8.1911 5 8.01933 5.04595 7.86784 5.13325L4.49824 7.08673C4.345 7.17096 4.21763 7.2954 4.12986 7.44664C4.04209 7.59788 3.99724 7.7702 4.00013 7.94504V11.8816C3.99724 12.0564 4.04209 12.2288 4.12986 12.38C4.21763 12.5313 4.345 12.6557 4.49825 12.7399L7.86785 14.6934C8.01933 14.7807 8.19111 14.8267 8.36595 14.8267C8.5408 14.8267 8.71258 14.7807 8.86406 14.6934L11.1495 13.3615L12.7025 12.444L14.988 11.112C15.1395 11.0247 15.3112 10.9788 15.4861 10.9788C15.6609 10.9788 15.8327 11.0247 15.9842 11.112L17.7715 12.148C17.9206 12.237 18.0445 12.3625 18.1317 12.5127C18.2188 12.6628 18.2663 12.8327 18.2696 13.0063V15.1078C18.2725 15.2826 18.2277 15.4549 18.1399 15.6062C18.0521 15.7574 17.9248 15.8819 17.7715 15.9661L15.9842 17.0317C15.8327 17.119 15.6609 17.1649 15.4861 17.1649C15.3112 17.1649 15.1395 17.119 14.988 17.0317L13.2006 15.9957C13.0515 15.9067 12.9276 15.7812 12.8404 15.631C12.7533 15.4809 12.7058 15.311 12.7025 15.1374V13.7759L11.1495 14.6934V16.0549C11.1466 16.2298 11.1915 16.4021 11.2793 16.5533C11.367 16.7046 11.4944 16.829 11.6476 16.9132L15.0172 18.8668C15.1687 18.9541 15.3405 19 15.5153 19C15.6902 19 15.862 18.9541 16.0135 18.8668L19.3831 16.9132C19.5321 16.8242 19.6561 16.6987 19.7432 16.5486C19.8304 16.3984 19.8779 16.2285 19.8812 16.0549V12.1184C19.8841 11.9435 19.8392 11.7712 19.7515 11.62C19.6637 11.4687 19.5363 11.3443 19.3831 11.26L15.9842 9.27698Z" fill="white"></path></svg>
                                </span>
                                <span className=''>
                                    <input className='shadow-none outline-none p-1 rounded-xl' placeholder='100' 
                                    value={isKdStake} onChange={(e) =>setKdStake(e.target.value)}
                                    />
                                </span>
                                <span className=''>
                                    <button className=' text-purple-600 font-bold p-1 bg-purple-100 rounded-lg'>max</button>
                                </span>
                                
                                </div >
                                <button type='submit'  className='my-10 mx-6 py-3 px-5 bg-purple-600 rounded-lg  w-2/3 md:w-3/6'>Stake</button>
                                </form>) :
                                (
                                <div>
                                    <h1 className='text-left font-bold font-sans text-3xl my-4'>Staking Overview</h1>
                                    <p className='font-mono font-xl text-left font-semibold pt-4'>Stake your AVS to gain access to USDC Yield Pool while Earning staking rewards on your AVS.
                                         The more AVS you lockup, the more USDC you can deposit to earn passive income</p>
                                    <button onClick={approveLido} className=' text-center my-10 mx-6 py-3 px-5 bg-purple-600 rounded-lg  w-2/3 md:w-3/6'>Approve</button>
                                </div>
                                )
                            }
                                
                            
                        </div>
                    </Tab.Panel>
                    <Tab.Panel><form 
                            onSubmit={(e) =>{
                                e.preventDefault()
                                let _amount = isPrice 
                                _amount = ethers.utils.parseEther(_amount);
                                unStakeKd(_amount)
                              }}
                            >
                                <div className='flex justify-between items-center p-3 border-2 border-gray-200 rounded-xl'>
                                <span className=' '>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C18.6271 0 24 5.37288 24 12C24 18.6271 18.6269 24 12 24C5.37312 24 0 18.6286 0 12C0 5.37144 5.37216 0 12 0Z" fill="#7B3FE4"></path><path d="M15.9842 9.27698C15.8327 9.18968 15.6609 9.14372 15.4861 9.14372C15.3112 9.14372 15.1394 9.18968 14.988 9.27698L12.7025 10.6385L11.1495 11.5264L8.86405 12.8879C8.71256 12.9752 8.54079 13.0212 8.36594 13.0212C8.1911 13.0212 8.01933 12.9752 7.86784 12.8879L6.05119 11.8224C5.90212 11.7334 5.77816 11.6079 5.69102 11.4577C5.60387 11.3075 5.5564 11.1376 5.55307 10.9641V8.8626C5.55018 8.68775 5.59503 8.51543 5.6828 8.36418C5.77058 8.21293 5.89794 8.08849 6.05119 8.00426L7.83854 6.96832C7.99003 6.88102 8.16181 6.83507 8.33666 6.83507C8.51151 6.83507 8.68329 6.88102 8.83478 6.96832L10.6221 8.00426C10.7712 8.09328 10.8951 8.21879 10.9823 8.36896C11.0694 8.51913 11.1169 8.68901 11.1202 8.8626V10.2241L12.6732 9.30657V7.94504C12.6761 7.7702 12.6312 7.59787 12.5434 7.44663C12.4557 7.29538 12.3283 7.17094 12.1751 7.0867L8.86405 5.13325C8.71256 5.04595 8.54079 5 8.36594 5C8.1911 5 8.01933 5.04595 7.86784 5.13325L4.49824 7.08673C4.345 7.17096 4.21763 7.2954 4.12986 7.44664C4.04209 7.59788 3.99724 7.7702 4.00013 7.94504V11.8816C3.99724 12.0564 4.04209 12.2288 4.12986 12.38C4.21763 12.5313 4.345 12.6557 4.49825 12.7399L7.86785 14.6934C8.01933 14.7807 8.19111 14.8267 8.36595 14.8267C8.5408 14.8267 8.71258 14.7807 8.86406 14.6934L11.1495 13.3615L12.7025 12.444L14.988 11.112C15.1395 11.0247 15.3112 10.9788 15.4861 10.9788C15.6609 10.9788 15.8327 11.0247 15.9842 11.112L17.7715 12.148C17.9206 12.237 18.0445 12.3625 18.1317 12.5127C18.2188 12.6628 18.2663 12.8327 18.2696 13.0063V15.1078C18.2725 15.2826 18.2277 15.4549 18.1399 15.6062C18.0521 15.7574 17.9248 15.8819 17.7715 15.9661L15.9842 17.0317C15.8327 17.119 15.6609 17.1649 15.4861 17.1649C15.3112 17.1649 15.1395 17.119 14.988 17.0317L13.2006 15.9957C13.0515 15.9067 12.9276 15.7812 12.8404 15.631C12.7533 15.4809 12.7058 15.311 12.7025 15.1374V13.7759L11.1495 14.6934V16.0549C11.1466 16.2298 11.1915 16.4021 11.2793 16.5533C11.367 16.7046 11.4944 16.829 11.6476 16.9132L15.0172 18.8668C15.1687 18.9541 15.3405 19 15.5153 19C15.6902 19 15.862 18.9541 16.0135 18.8668L19.3831 16.9132C19.5321 16.8242 19.6561 16.6987 19.7432 16.5486C19.8304 16.3984 19.8779 16.2285 19.8812 16.0549V12.1184C19.8841 11.9435 19.8392 11.7712 19.7515 11.62C19.6637 11.4687 19.5363 11.3443 19.3831 11.26L15.9842 9.27698Z" fill="white"></path></svg>
                                </span>
                                <span className=''>
                                    <input className='shadow-none outline-none px-1 py-3 rounded-xl' placeholder='100' 
                                    value={isUnstakeKd} onChange={(e) =>setUnStakeKd(e.target.value)}
                                    />
                                </span>
                                <span className=''>
                                    <button className=' text-purple-600 font-bold p-1 bg-purple-100 rounded-lg'>max</button>
                                </span>
                                
                                </div >
                                <button type='submit'  className='my-10 mx-6 py-3 px-5 bg-purple-600 rounded-lg  w-2/3 md:w-3/6'>UnStake</button>
                                </form></Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>

        <div>
            <div className='flex justify-around my-8'>
            <h1 className=''>Nexagon statistics </h1>
            <p className='text-blue-400 underline cursor-pointer'>View on Etherscan</p>
            </div>
            <div className='flex justify-between items-center px-4 py-6 bg-purple-200  rounded-xl'>
                <h2>Your Assets</h2>
                <p>kd: {" "}{parseFloat(isTotalKd).toFixed(2) }</p>
            </div>
        </div>
        </>
    );
}

export default Table