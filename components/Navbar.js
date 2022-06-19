import { Dialog, Transition , Menu} from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { useConnect, useAccount, useProvider, useSigner, useDisconnect, useBalance, useNetwork } from 'wagmi';
import { useTheme } from 'next-themes'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { ethers, utils } from 'ethers';
import { useIsMounted} from '../hooks/useIsMounted'
import NetworkSwitcher from './NetworkSwitcher';

 const Navbar =() => {


 
    let [isOpen, setIsOpen] = useState(false)
    const { theme, setTheme } = useTheme()
    const provider = useProvider()
    const signer = useSigner()
    const { data: accountData } = useAccount()
    const {data: balance} = useBalance()
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
       
       <div className="flex justify-between items-center w-11/12 mx-auto my-4 p-2">
    <a href="/" className="flex items-center pr-2" aria-current="page">
                    <img className="h-10" src="logo.svg" />
                </a>
{/* 
                  <div className="cursor-pointer ml-4 md:hidden"
              onClick={() => {
                setTheme(theme === 'light' ? 'dark' : 'light')
              }}
           >
               {theme === 'light' ?
               <img className="w-5 h-5" src="moon.svg" alt="" /> 

               :
               <img className="w-5 h-5" src="sun.svg" alt="" />
            }
               </div>  */}
        <div className='hidden md:flex items-center justify-between space-x-10'>
            <p className='text-black  dark:text-gray-100 '>Twitter</p>
            <p className='text-black  dark:text-gray-100 '>Telegram</p>
            {/* <div className="cursor-pointer ml-4 hidden md:inline-block"
              onClick={() => {
                console.log('fire')
                setTheme(theme === 'light' ? 'dark' : 'light')
              }}
           >
               {theme === 'light' ?
               <img className="w-5 h-5" src="moon.svg" alt="" /> 
               :
               <img className="w-5 h-5" src="sun.svg" alt="" />
            }
               </div> */}
        </div>
        <div className='ml-3 flex items-center justify-around'>
            {/* <div>Chase: $0.003</div> */}
      {/* <Menu as="div" className="relative inline-block md:hidden text-left ">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-black  dark:text-gray-100  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Options
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                   Presale
                  </button>
                )}
              </Menu.Item>
              </div>  
          </Menu.Items>
        </Transition>
      </Menu> */}


       

      <div className='ml-3'>
          <button onClick={openModal} className='border-gray-800 dark:border-gray-100 border-2 text-black dark:text-gray-100 bg-inherit text-sm font-semibold p-2 rounded-xl'>{accountData ? 'Account' : 'Connect'}</button>
      </div>
      </div>
    </div>

    <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
        //   design the modal full body here
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="div"
                className="flex justify-between px-3"
                >
                    <h2 className="text-lg font-medium leading-6 text-black">{accountData ? 'Wallet Details': 'Connect Wallet'}</h2>
                    <svg 
                    onClick={closeModal}
                    xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
                </Dialog.Title>
                <div className="mt-2">
                {!accountData &&
                <div className='flex flex-col'>
                 {connectors
          .filter((x) => isMounted && x.ready && x.id !== activeConnector?.id)
          .map((x) => (
            <button 
            className='hover:bg-black hover:text-white text-black bg-inherit border border-gray-600  p-2 rounded-lg w-full' 
            key={x.id} onClick={() => connect(x)}>
              {x.name}
              {isConnecting && x.id === pendingConnector?.id && ' (connecting)'}
            </button>
               ))}

  
                
                      <p className='py-3 px-2 text-left text-sm font-serif text-gray-800'>Please make sure you&apos;re on Binance Chain</p>
                      <a target="_blank" rel="noopener noreferrer" href="https://metamask.io" className="py-3 px-2 text-left text-sm font-serif text-blue-500 hover:text-blue-800 cursor-pointer underline ">Get Metamask </a>

                    </div>
                     }
                     {accountData && 
                       <div className='my-4'>
                         <NetworkSwitcher />
                       <p className='text-black text-center mb-8'>Address: {truncateAddress(accountData?.address)}</p>
                      {/* <p className='text-black text-center'>ChainId: {chainId}</p> */}
                      <button onClick={disconnect} className='mb-4 hover:bg-black hover:text-white  text-black bg-inherit border border-gray-600  p-2 rounded-lg w-full'>Disconnect</button>
                  
               
                    {/* <p className='text-black text-center font-serif font-semibold mx-auto'>{chainId 
                    // == 80001? 'Polygon': 'Wrong Network' 
                    }</p> */}
                    {/* <p className='text-black text-center font-serif font-semibold mx-auto'>Balance: {shortNumber(balance)}</p> */}
                    <p className='py-3 text-left text-lg text-red-400 font-serif'> {error && <div>{error.message}</div>}</p>
                  </div>
                     }
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
        </>
    );
    
}

export default Navbar