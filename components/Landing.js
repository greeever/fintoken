import { useState } from "react";



 const Landing =() => {
    const [first, setFirst] = useState(false)
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)
    const [fouth, setFouth] = useState(false) 

  
    return (
        <>
            <div className="flex flex-col justify-between items-center mx-auto py-8 my-8">
              <h1 className=" text-4xl md:text-8xl font-serif text-left leading-10 text-white">Lido Network is a decentralized crypto Staking and Yield farming Incentitve protocol on Polygon-Matic chain </h1>
            <img src="savings.svg" />
           
            </div>
            <div>
            <div className="mt-24  max-w-3xl mx-auto border-2 bg-purple-300 py-5 px-8 shadow-xl rounded-lg">
                <div className="flex justify-center items-center">
                <h2 className="font-sans font-normal text-white">What is Lido for Polygon?</h2>
                <button onClick={(() => {setFirst(!first)})}>{first ?
                 (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
               </svg>) 
                 :
                 (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
               </svg>)}
               
               </button>
                
                </div>
                {first && 
            <p className=" text-lg font-semibold font-sans pt-6 pb-3 ">Lido for Polygon is a liquid staking solution for MATIC backed by industry-leading staking providers. Lido lets users earn MATIC staking rewards without needing to maintain infrastructure and enables them to trade staked positions, as well as participate in on-chain decentralized finance with their staked assets.</p>
        }
            </div>
            <div className="mt-4  max-w-3xl mx-auto border-2 bg-purple-300 py-5 px-8 shadow-xl rounded-lg">
                <div className="flex justify-center items-center">
                <h2 className="font-sans font-normal text-white">How does Lido for Polygon work ?</h2>
                <button onClick={(() => {setSecond(!second)})}>{second ?
                 (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
               </svg>) 
                 :
                 (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
               </svg>)}
               
               </button>
                
                </div>
                {second && 
            <p className=" text-lg font-semibold font-sans pt-6 pb-3">When staking with Lido for Polygon, users start mining rewars tokens immediately. Lido will calculate the current ratio and send the correct amount to the user. MATIC tokens are then delegated across Polygon validators that are part of Lido for Polygon.</p>
        }
            </div>
            <div className="mt-4 mb-6  max-w-3xl mx-auto border-2 bg-purple-300 py-5 px-8 shadow-xl rounded-lg">
                <div className="flex justify-center items-center">
                <h2 className="font-sans font-normal text-white">What is liquid staking ?</h2>
                <button onClick={(() => {setThird(!third)})}>{third ?
                 (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
               </svg>) 
                 :
                 (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
               </svg>)}
               
               </button>
                
                </div>
                {third && 
            <p className=" text-lg font-semibold font-sans pt-6 pb-3">Liquid staking protocols allow users to earn staking rewards without locking assets or maintaining staking infrastructure. Users can deposit tokens and receive tradable liquid tokens in return. The DAO-controlled smart contract stakes these tokens using elected staking providers. As users funds are controlled by the DAO, staking providers never have direct access to the users assets.</p>
        }
            </div>
            <div className="mt-4 mb-6  max-w-3xl mx-auto border-2 bg-purple-300 py-5 px-8 shadow-xl rounded-lg">
                <div className="flex justify-center items-center">
                <h2 className="font-sans font-normal text-white">How long after requesting withdraw can I claim $LiFi?</h2>
                <button onClick={(() => {setFouth(!fouth)})}>{third ?
                 (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
               </svg>) 
                 :
                 (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
               </svg>)}
               
               </button>
                
                </div>
                {fouth && 
            <p className=" text-lg font-semibold font-sans pt-6 pb-3">You can claim rewards anytime. Rewards keeps growing every block
            </p>
        }
            </div>
            </div>
            
           
        </>
    );
    
}

export default Landing