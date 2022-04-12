import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useConnect, useAccount } from 'wagmi';


 const Navbar =() => {
    const [{ data, error}, connect] = useConnect()
    const [{ data: accountData }, disconnect] = useAccount({
      fetchEns: true,
    })
    let [isOpen, setIsOpen] = useState(false)

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
    return (
        <>
        <div className='  '>
            <div className="flex justify-between items-center align-middle mx-auto py-4 border-b-2 border-gray-500 ">
                <div className='flex'>
                    <svg width="89" height="20" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M27.172 4.094h2.25v9.656h5.531v2.156h-7.781V4.094zm17.617 0h2.25v11.812h-2.25V4.094zm13.021 0h3.75c.774 0 1.512.162 2.212.487.7.313 1.319.738 1.856 1.275a6.078 6.078 0 011.275 1.875c.313.713.469 1.469.469 2.269s-.156 1.556-.469 2.269a6.078 6.078 0 01-1.275 1.875 6.435 6.435 0 01-1.856 1.293c-.7.313-1.438.47-2.212.47h-3.75V4.093zm3.75 9.656c.462 0 .906-.1 1.33-.3.438-.2.82-.469 1.144-.806.338-.338.6-.732.788-1.181.2-.463.3-.95.3-1.463 0-.512-.1-.994-.3-1.444a3.576 3.576 0 00-.788-1.2 3.717 3.717 0 00-1.143-.806 3.09 3.09 0 00-1.331-.3h-1.5v7.5h1.5zM82.558 16a5.56 5.56 0 01-2.213-.45 5.978 5.978 0 01-1.818-1.275 6.625 6.625 0 01-1.238-1.912A6.118 6.118 0 0176.84 10c0-.838.15-1.619.45-2.344a6.304 6.304 0 011.238-1.912 5.575 5.575 0 011.818-1.275A5.367 5.367 0 0182.558 4a5.24 5.24 0 012.194.469c.7.3 1.306.725 1.818 1.275a5.868 5.868 0 011.238 1.912c.312.725.469 1.506.469 2.344 0 .85-.157 1.637-.47 2.363a6.144 6.144 0 01-1.237 1.912 5.689 5.689 0 01-1.818 1.275c-.688.3-1.42.45-2.194.45zm0-2.156c.462 0 .906-.094 1.331-.281a3.31 3.31 0 001.106-.788 4.13 4.13 0 00.75-1.219c.188-.475.282-.993.282-1.556 0-.563-.094-1.075-.282-1.537a3.855 3.855 0 00-.75-1.22 3.263 3.263 0 00-2.437-1.088 3.333 3.333 0 00-1.35.282 3.25 3.25 0 00-1.088.807 3.854 3.854 0 00-.75 1.219A4.057 4.057 0 0079.09 10c0 .563.093 1.081.28 1.556.188.463.438.869.75 1.219.313.338.675.6 1.088.787a3.3 3.3 0 001.35.282z"></path><path fillRule="evenodd" clipRule="evenodd" d="M7.005 0l4.949 7.748-4.949 2.884-4.948-2.884L7.005 0zM3.572 7.381l3.433-5.376 3.434 5.376-3.434 2.002L3.572 7.38z" fill="#00A3FF"></path><path d="M6.998 12.335L1.258 8.99l-.157.245a6.999 6.999 0 1011.796 0l-.157-.245-5.742 3.346z" fill="#00A3FF"></path></svg>
                </div>
                <button
            type="button"
            onClick={openModal}
            className="px-4 py-2 text-sm  text-white font-semibold font-mono rounded-md bg-purple-700 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Buy $LiFI
          </button>
                {!accountData ? (
                  <div className=''>
                    
                  <button
            type="button"
            onClick={openModal}
            className="px-4 py-2 text-sm  text-white font-semibold font-mono rounded-md bg-purple-700 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Connect
          </button>
                  </div>
                ) : (
                  <div className='flex '>
                    <p className='p-1 rounded-xl bg-purple-200 text-sm font-semibold'>{truncateAddress(accountData.address)}</p>
                    <svg onClick={disconnect} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
</svg>
                  </div>
                  
                )}
                
            </div>
            </div>


            <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto "
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
              <div className="inline-block h-64 w-11/12 max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="div"
                className="flex justify-between px-3"
                >
                    <h2 className="text-lg font-medium leading-6 text-gray-900"> Choose Wallet</h2>
                    <span className="text-lg font-extrabold  text-gray-900" onClick={closeModal}>X</span> 
                </Dialog.Title>
                <div className="mt-2">
                <div className='flex flex-col'>
                    {data.connectors.map((connector) => (
                        <button
                        className='p-2 bg-purple-700 mx-2 text-white rounded-xl my-3'
                        disabled={!connector.ready}
                        key={connector.id}
                        onClick={() => connect(connector)}
                        >
                        {connector.name}
                        {!connector.ready && ' (unsupported)'}
                        </button>
                    ))}
                      <p className='py-3 text-left text-sm font-serif'>Please make sure you&apos;re on polygon mainnet</p>
                    {/* {error && <div>{error?.message ?? 'Failed to connect'}</div>} */}
                    </div>
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