import Head from 'next/head'
import { useAccount, useBalance } from "wagmi";
// import Navbar  from "../components/Navbar";
// import Layout from "../components/Layout";
// import Landing from '../components/Landing'
// // import Footer from '../components/Footer'
// import Subheading from '../components/Subheading'

// import {ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// toast.configure()

const Home = () => {
  // const [{ data: accountData }] = useAccount({
  //   fetchEns: true,
  // })

  return (
    <>
    <Head>
    <title>Lido</title>
        <meta name="description" content="Lido Polygon Pool" />
        <link rel="icon" href="/polygon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Ramaraja&display=swap" rel="stylesheet" />
    </Head>
     <div className="w-11/12 mx-auto">
        {/* <Navbar className='fixed top-0 pb-10' />
    {accountData ? (<Layout />): (<Subheading />)}    
      {/* <Footer className="" /> */}
      
 
      {/* <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={true}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      /> */}
      </div>
      </>
  );
};

export default Home;
