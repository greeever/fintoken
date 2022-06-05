import { useAccount, useBalance } from "wagmi";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
import Layout from '../components/Layout'
import Landing from '../components/Landing'
// toast.configure()
// let provider
const Home = () => {
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  })
  // mainnet addresses
  // Lidotoken deployed to: 0xEe81Bde5cf32730b6627f61096fb6Cc07E0A962A
  // Ido deployed to: 0x5015D2ed2a861d1FDf66505Bdd4aAD7CE34B646e
  // LidoPool deployed to: 0x08F285104dBF45D89EaA487eDc21FA2D92B04a46
  return (
    <>
     <div className="w-11/12 mx-auto">
         <Navbar className='fixed top-0 pb-10' />
    {accountData ? (<Layout />): (<Landing />)}    
       {/* <Footer className="" /> */}
      
 
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={true}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
     
      </div>
      </>
  );
};

export default Home;
