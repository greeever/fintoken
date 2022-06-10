import { Dialog, Transition , Menu} from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { useConnect, useAccount, useProvider, useSigner, useDisconnect, useBalance } from 'wagmi';
import { useTheme } from 'next-themes'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { ethers, utils } from 'ethers';
import { useIsMounted} from '../hooks/useIsMounted'
import Account from './Account';
 const Navbar =() => {


 
    let [isOpen, setIsOpen] = useState(false)
    const { theme, setTheme } = useTheme()
    const provider = useProvider()
    const signer = useSigner()
    const { data: accountData } = useAccount()
    const {data} = useBalance()
    const isMounted = useIsMounted()
    const {
      activeConnector,
      connect,
      connectors,
      error,
      isConnecting,
      pendingConnector,
    } = useConnect()
    const { disconnect } = useDisconnect()


    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }

    const truncateAddress = (address) => {
      return address.slice(0, 6) 
      + "..." + address.slice(-4);
    };
    function shortNumber(x) {
      return Number.parseFloat(x).toFixed(2);
    }

    
    
    return (
        <>
       
       <div className="flex justify-between items-center w-11/12 mx-auto my-4 p-2 z-50">
    <a href="/" className="flex items-center pr-2" aria-current="page">
                    <img className="h-10" src="/poollogo.svg" />
                </a>

     
        <div className='ml-3 flex items-center justify-around'>
           
       

      <div className='ml-3'>
          <button onClick={(() => {
              setIsOpen(!isOpen)
          })} className='border-gray-200 border-2 text-white bg-inherit text-sm font-semibold p-2 rounded-xl'>{accountData ? 'Account' : 'Connect'}</button>
      </div>
      </div>
    </div>

   {isOpen &&
      <Account handleClick={closeModal} />
    }
       
        </>
    );
    
}

export default Navbar