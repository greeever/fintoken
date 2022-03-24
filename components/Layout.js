import { useState, useEffect} from 'react'
import {useAccount} from 'wagmi'
import { Contract,ethers } from 'ethers'

import KnotPool  from '../abis/KnotPool.json'
const Knot_Address = '0xeD1cd612b81D878a03a5839BB0B57e5768062119'
import Table from "./Table";

 const Layout =() => {
    const [{ data: accountData }] = useAccount({
        fetchEns: true,
      })
      
      const [isTotalKd, setTotalKd] = useState(0.00)

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





    useEffect(() => {
        ReadKnot()   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <>
            <div className="mt-24 max-w-3xl mx-auto">
                <div className="text-center ">
                    <h1 className="font-extrabold font-serif text-5xl my-4">Lido for polygon</h1>
                    <p className="font-mono text-lg font-semibold">Stake on Lido and earn profits</p>
                  <div>
                    <p>Pool TLV: </p>
                    <p>{parseFloat(isTotalKd).toFixed(2)}</p>
                    <svg width="89" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.998 12.335L1.258 8.99l-.157.245a6.999 6.999 0 1011.796 0l-.157-.245-5.742 3.346z" fill="#00A3FF"></path>
                    </svg>
                  </div>
                    

                </div>
                <div>
                    <Table />
                </div>
            </div>
        </>
    );
    
}

export default Layout