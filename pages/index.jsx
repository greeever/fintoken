import { useAccount } from "wagmi";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import Account from "../components/Account";
// let provider
const Home = () => {
  const { data } = useAccount()




  return (
    <>
    <div className="h-full w-full max-w-4xl px-2 mx-auto">
            {/* <Navbar />
            */}
            {/* <Account /> */}
            <Layout /> 
       </div>
      </>
  );
};

export default Home;
