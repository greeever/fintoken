import { useState, useEffect, useMemo} from 'react'
import { useContract, useProvider, useSigner, erc20ABI, useAccount, useContractRead} from 'wagmi'
import { Contract, BigNumber,ethers } from 'ethers'

import KnotPool  from '../abis/KnotPool.json'
const token = '0xF459685B803cdb63D9230079159B0614F4f49dc4'
// const address = '0xe6402f8adc9dd5909602a25ea5c5b7d2528a62a2'
import Table from "./Table";
let Pool, tx, provider

 const Layout =() => {
    const [{ data: accountData }] = useAccount({
        fetchEns: true,
      })
      
      

    const [isPrice, setPrice] = useState('0')
        async function getBalance () {
            try {
                provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
                Pool =  new  Contract(token, erc20ABI, provider);
                tx = await Pool.balanceOf(accountData.address)
                console.log(tx)
                setPrice(ethers.utils.formatEther(tx))
            } catch (error) {
                console.log('this is an error', error)
            }
        }





    useEffect(() => {
        getBalance ()    
    },[])
    return (
        <>
            <div className="mt-24">
                <div className="text-center ">
                    <h1 className="font-extrabold font-sans text-4xl my-4">Nexagon for polygon</h1>
                    <p className="font-mono text-lg font-semibold">Stake on Nexagon and earn profits</p>
                  
                    <p>{isPrice}</p>

                </div>
                <div>
                    <Table />
                </div>
            </div>
        </>
    );
    
}

export default Layout