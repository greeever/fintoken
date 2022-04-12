import Table from "./Table";
import TokenSale from "./TokenSale";
import CdTimerComp from "./CdTimerComp";



const Layout =() => {

  
    return(
        <div>
             <div className="mt-24 max-w-3xl mx-auto">
                <div className="text-center mb-6">
                    <h1 className="font-extrabold font-serif text-5xl my-4 text-white">Lido for polygon</h1>
                    <p className="font-sans text-lg font-semibold py-4 text-white">You buy $LiFi. We farm in DeFi projects. You get rewards.</p>      

                </div>
                <div className='py-4'>
                    <p className='text-lg font-serif font-normal text-center text-white'>Time until next rebase:</p>
                    <CdTimerComp />
                </div>
                <div className='pt-4 pb-24'>
                      <TokenSale />
                    </div>
                <div className='pt-24'>
                    <Table />
                </div>
            </div>
        </div>
    );
 }


 export default Layout