import { useNetwork } from 'wagmi'


const NetworkSwitcher = () => {
    const {
        activeChain,
        chains,
        error,
        isLoading,
        pendingChainId,
        switchNetwork,
      } = useNetwork()

    return (
        <>
         <div>
      <div className='text-gray-800 font-sans font-medium'>
        Connected to {activeChain?.name ?? activeChain?.id}.

        {activeChain?.unsupported && ' (unsupported)'}
      </div>

      {switchNetwork && (
        <div>
            <p className='text-base font-medium text-gray-800'>Click on the Binance to switch</p>
          {chains.map((x) =>
            x.id === activeChain?.id ? null : (
              <p
              className=' cursor-pointer text-orange-300 text-center underline font-serif text-xl' 
              key={x.id} onClick={() => switchNetwork(x.id)}>
                {x.name}
                {isLoading && x.id === pendingChainId && ' (switching)'}
              </p>
            ),
          )}
        </div>
      )}

      <div>{error && error.message}</div>
    </div>
        </>
    )
}


export default NetworkSwitcher