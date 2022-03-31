import Head from 'next/head'
import { useAccount, useBalance } from "wagmi";
import { ethers, Contract } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../context'
import { createWatcher } from '@makerdao/multicall';

import PresaleAbi from '../abis/LidSimplifiedPresale.json'
import StakingAbi from '../abis/LidStaking.json'
import AccessAbi from '../abis/LidSimplifiedPresaleAccess.json'
import RedeemerAbi from '../abis/LidSimplifiedPresaleRedeemer.json'
import TimerAbi from '../abis/LidSimplifiedPresaleTimer.json'

import Navbar  from "../components/Navbar";
import Layout from "../components/Layout";
import Landing from '../components/Landing'
import Footer from '../components/Footer'
// import Subheading from '../components/Subheading'

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// toast.configure()

const timerAddress = '0x0deb6892035f77D42c29F3b36f38D0cDAa47EF0F'
const redeemerAddress = '0x1705061Ec6696F63d1c79825f4E075CB9F7148F7'
const accessAddress = '0xEC1D3b13846189579e919F1D2f29a88D25579322'
const stakingAddress = '0x4fe7089f369FE17B7Ce58943FB0A5AeF6B631942'
const presaleAddress = '0x6b2cBbf52007a8cE6B4e6e27914E451471ee43b7'
// let provider
const Home = () => {
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  })
  // let provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
  // const [web3, setWeb3] = useState(new ethers.providers.Web3Provider(provider));

  // const [state, setState] = useState({
  //   startTime:  new Date(Date.UTC(2022, 3, 7, 3, 45, 0, 0)),
  //   accessTime: new Date(Date.UTC(2022, 3, 7, 4, 0, 0, 0)),
  // });


  // const [address, setAddress] = useState("")
  // const [web3, setWeb3] = useState(new ethers.providers.Web3Provider(provider))
  // const [connected, setConnected] = useState(false)

  // const [startTime, setStartTime] = useState( new Date(Date.UTC(2022, 3, 7, 3, 45, 0, 0)))
  // const [endTime, setEndTime] = useState(null)
  // const [isActive, setIsActive] = useState(false)
  // const [isEnded, setIsEnded] = useState(false)

  // const [lidPresaleSC, setLidPresale] = useState(null)
  // const [lidTimerSC, setLidTimerSC] = useState(null)
  // const [lidTokenSC, setLidTokenSC] = useState(null)

  // const [totalLid, setTotalLid] = useState("0")
  // const [totalEth, setTotalEth] = useState("0")
  // const [totalDepositors, setTotalDepositors] = useState("0")

  // const [accountLid, setAccountLid] = useState("0")
  // const [accountEthDeposit, setAccountEthDeposit] = useState("0")
  // const [isWhitelisted, setIsWhitelisted] = useState(false)

  // const [currentPrice, setCurrentPrice] = useState("0")
  // const [maxDeposit, setMaxDeposit] = useState("0")
  // const [earnedReferrals, setEarnedReferrals] = useState("0")
  // const [referralCount, setReferralCount] = useState("0")

  // const [hasSentToUniswap, setHasSentToUniswap] = useState(false)
  // const [hasIssuedTokens, setHasIssuedTokens] = useState(false)
  // const [hasSentEther, setHasSentEther] = useState(false)
  // const [finalEndTime, setFinalEndTime] = useState("0")
  // const [accountRedeemable, setAccountRedeemable] = useState("0")
  // const [accountClaimedLid, setAccountClaimedLid] = useState("0")

  // const [depositVal, setDepositVal] = useState("")
  // const [maxShares, setMaxShares] = useState("0")

  // const toBN = web3.utils.toBN
  // const toWei = web3.utils.toWei
  // const fromWei = web3.utils.fromWei

  // let referralAddress = window.location.hash.substr(2);
  // if(!referralAddress || referralAddress.length !== 42 ) referralAddress = "0x0000000000000000000000000000000000000000"

  // useEffect(()=>{
  //   if(!web3) return
  //   if(!address) return

  //   const presale = new web3.eth.Contract(abis.presale, addresses.presale)
  //   const timer = new web3.eth.Contract(abis.timer, addresses.timer)
  //   const redeemer = new web3.eth.Contract(abis.redeemer, addresses.redeemer)
  //   const token = new web3.eth.Contract(abis.token, addresses.token)

  //   setLidPresale(presale)

  //   //TODO: Switch to multicall.js
  //   let fetchData = async(web3,address,presale,timer,redeemer,token)=>{
  //     const [
  //       totalLid,
  //       totalEth,
  //       totalDepositors,
  //       accountLid,
  //       accountEthDeposit,
  //       earnedReferrals,
  //       referralCount,
  //       hasSentToUniswap,
  //       hasIssuedTokens,
  //       finalEndTime,
  //       accountClaimedLid,
  //       isEnded,
  //       maxShares
  //     ] = await Promise.all([
  //       presale.methods.totalTokens().call(),
  //       web3.eth.getBalance(addresses.presale),
  //       redeemer.methods.totalDepositors().call(),
  //       redeemer.methods.accountShares(address).call(),
  //       redeemer.methods.accountDeposits(address).call(),
  //       presale.methods.earnedReferrals(address).call(),
  //       presale.methods.referralCounts(address).call(),
  //       presale.methods.hasSentToUniswap().call(),
  //       presale.methods.hasIssuedTokens().call(),
  //       presale.methods.finalEndTime().call(),
  //       redeemer.methods.accountClaimedTokens(address).call(),
  //       presale.methods.isPresaleEnded().call(),
  //       redeemer.methods.getMaxShares(toWei("1000")).call()
  //     ])

  //     const [
  //       maxDeposit,
  //       endTime,
  //       currentPrice,
  //       accountRedeemable
  //     ] = await Promise.all([
  //       presale.methods.getMaxWhitelistedDeposit().call(),
  //       timer.methods.endTime().call(),
  //       redeemer.methods.calculateRatePerEth(toWei("430000000"),totalEth,toWei("1000")).call(),
  //       redeemer.methods.calculateReedemable(address, finalEndTime, toWei("430000000")).call()
  //     ])
  //     console.log("maxShares",maxShares)
  //     console.log("maxShares string",maxShares.toString())
  //     setTotalLid(totalLid)
  //     setTotalEth(totalEth)
  //     setTotalDepositors(totalDepositors)
  //     setAccountLid(accountLid)
  //     setAccountEthDeposit(accountEthDeposit)
  //     setCurrentPrice(currentPrice)
  //     setEarnedReferrals(earnedReferrals)
  //     setReferralCount(referralCount)
  //     setIsWhitelisted(isWhitelisted)
  //     setMaxDeposit(maxDeposit)
  //     setEndTime(new Date(endTime*1000))
  //     setHasSentToUniswap(hasSentToUniswap)
  //     setHasIssuedTokens(hasIssuedTokens)
  //     setHasSentEther(hasSentEther)
  //     setFinalEndTime(finalEndTime)
  //     setAccountRedeemable(accountRedeemable)
  //     setAccountClaimedLid(accountClaimedLid)
  //     setIsEnded(isEnded)
  //     setMaxShares(maxShares)
  //   }

  //   fetchData(web3,address,presale,timer,redeemer,token)

  //   let interval;
  //   if(window.ethereum){
  //     interval = setInterval((web3,address,presale,timer,redeemer,token)=>{
  //       if(!web3 || !address || !presale || !timer || !redeemer) return
  //       fetchData(web3,address,presale,timer,redeemer,token)
  //     },2000)
  //   }else{
  //     interval = setInterval((web3,address,presale,timer,redeemer,token)=>{
  //       if(!web3 || !address || !presale || !timer || !redeemer) return
  //       fetchData(web3,address,presale,timer,redeemer,token)
  //     },10000)
  //   }

  //   return ()=>clearInterval(interval)

  // },[web3,address])

  // useEffect(() => {
    
  // },[])

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
         <Navbar className='fixed top-0 pb-10' />
    {accountData ? (<Layout />): (<Landing/>)}    
       <Footer className="" />
      
 
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
