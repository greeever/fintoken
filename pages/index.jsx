import { useState } from "react";
import { useAccount, useBalance } from "wagmi";
import Navbar  from "../components/Navbar";
import Layout from "../components/Layout";
import Landing from '../components/Landing'
import Footer from '../components/Footer'

const Home = () => {
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  })

  return (
    <>
      <div className="w-11/12 mx-auto">
        <Navbar className='fixed top-0 pb-10' />
    {accountData ? (<Layout />): (<Landing />)}    
      <Footer className="" />
      </div>
    </>
  );
};

export default Home;
