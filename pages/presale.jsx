

import { Contract,ethers } from 'ethers'
import {useAccount, useSigner} from 'wagmi'
import KnotPool from '../abis/KnotPool.json'
import {useState} from 'react'
const Knot_Address = '0x08F285104dBF45D89EaA487eDc21FA2D92B04a46'
 const Presale =() => {
    const [{ data: accountData }] = useAccount({
        fetchEns: true,
      })
      const [{ data: signer }] = useSigner()
    const [isContribute, setContribute] = useState(0)
    const [isPrice, setPrice] = useState('0')
    const [isKdStake, setKdStake] = useState('')

    async function StakeKd() {
        // if (_amount <= 0 && !accountData.address)  return null;
        try {
            let knot = await new  Contract(Knot_Address, KnotPool.abi, signer);
            let amount = await ethers.utils.parseEther('1')
            let response = await knot.setStakingAmount(amount);
            let hash = response.hash
            console.log(response); 
            console.log(hash); 
        } catch (error) {
            console.log('this is deposit error', error)
        }
        } 
     
    return(
        <>
        {/* {} */}
            <div className='mt-24 max-w-3xl mx-auto'>
               
            <div>
                <p className='text-4xl font-sans font-black text-center mt-4'>Admin</p>
            </div>
            
                                <div className='flex justify-between items-center p-3 border-2 border-gray-200 rounded-xl'>
                                
                                <button onClick={StakeKd}  className='my-10 mx-6 py-3 px-5 bg-purple-600 rounded-lg  w-2/3 md:w-3/6'>Stake</button>
                                </div >
                               
                                
                            
            
        </div>
        </>
    );
 }

 export default Presale;