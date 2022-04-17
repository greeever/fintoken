import { useState} from 'react'
import { Contract,ethers } from 'ethers'
import Ido  from '../abis/Ido.json'
import {useAccount, useSigner} from 'wagmi'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const IdoAddress = '0x5015D2ed2a861d1FDf66505Bdd4aAD7CE34B646e'

const TokenSale = () => {
    
    const [isPrice, setPrice] = useState('0')
    const [isKdStake, setKdStake] = useState()
    const [isLoading, setLoading] = useState(false)


    const [{ data: accountData }] = useAccount({
        fetchEns: true,
      })
      const [{ data: signer }] = useSigner()


      async function buyLifi() {
        // if (_amount <= 0 && !accountData.address)  return null;
        try {
            setLoading(true)
            let knot = await new  Contract(IdoAddress, Ido.abi, signer);
            let amount = ethers.utils.parseEther(isKdStake.toString());
            let response = await knot.buyLemonTokens({value: amount});
            let hash = response.hash
            setInput('')
            setLoading(false)
            toast.success('Transaction sucessful')
            console.log(response); 
        } catch (error) {
            setLoading(false)
            toast.error('Could not stake, please make sure yo have enough coins')
            console.log('this is deposit error', error)
        }
    }
      
    return (
        <>
        <div className=''>

            <div className='mx-auto py-3 border-2 border-purple-600 bg-gray-500 shadow-xl rounded-xl'>
                <div className='flex items-center justify-between py-4 px-4'>
                    <p className='text-lg font-sans font-normal text-white'>Rate:</p>
                    <p className='text-sm font-sans font-light text-white'>1 MATIC/ 25 LDN</p>
                </div>
                <div className='flex items-center justify-between pb-4 px-4'>
                    <p className='text-lg font-sans font-normal text-white'>Total:</p>
                    <p className='text-sm font-sans font-light text-white'>500M $LDN</p>
                </div>
                <div className='flex items-center justify-between pb-4 px-4'>
                    <p className='text-lg font-sans font-normal text-white'>Contract:</p>
                    <a target="_blank" href="https://polygonscan.com/token/0xEe81Bde5cf32730b6627f61096fb6Cc07E0A962A" rel="noopener noreferrer" className=' underline cursor-pointer'>
                    <p className='text-purple-500 underline'>View on polyscan</p>
                         </a>
                </div>

                
                <form  onSubmit={(e) =>{
                              e.preventDefault()
                                buyLifi()
                              }}
                            >
                                <div className='flex justify-center items-center border-2 border-gray-400 rounded-xl mx-2'>
                                    <input className='shadow-none outline-none rounded-xl w-full  py-3 px-4 ' placeholder='100...' 
                                   value={isKdStake} onChange={(e) =>setKdStake(e.target.value)}
                                    type='number'
                                    />
                                
                                </div >
                                <div className='flex justify-center items-center'>
                                <button disabled={isLoading} type='submit'  className='font-semibold text-xl text-white my-10 mx-6 py-3 px-5 bg-purple-600 rounded-lg  w-2/3 md:w-3/6'>{isLoading ? 'Loading...' : 'Buy $LDN'}</button>
                                </div>
                               
                                </form>

                
        </div>
        </div>          
        </>
    );
}

export default TokenSale