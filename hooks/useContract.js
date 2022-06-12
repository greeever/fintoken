import { useContract } from "wagmi";
const HoldingsAddress = '0x74Da4b4D00f3484B82195734840E3BAd62702D92'
import Holdings from '../abi/Holdings.json'

 export const contract = useContract({
     addressOrName: HoldingsAddress,
     contractInterface: Holdings.abi
 })