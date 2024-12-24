
import {ethers} from "ethers"
import contractAbi from "../constants/contractAbi.json"
import toast from "react-hot-toast"
import axios from "axios"
export const connectWallet = async()=>{
 try {
    
     if(!window.ethereum){
        throw new Error("Metamask is not installed")
     }
     const accounts =await window.ethereum.request({
        method:"eth_requestAccounts"
     })
     const selectedAccount = accounts[0];
    
     const provider = new ethers.BrowserProvider(window.ethereum);
     const signer = await provider.getSigner();
     
     const message = "Welcome to Crypto Vault Website";
     const signature = await signer.signMessage(message)
     
     const dataSignature = {
      signature
     }
     const url=`http://localhost:8080/api/authentication?address=${selectedAccount}`
     const res = await axios.post(url,dataSignature)
     const token = res.data.token
     
     localStorage.setItem("token",token)

     const contractAddress = "0x575C7D13B19D1C3cD8F0Ad7dd562aB8A59631F82";
     const contractInstance = new ethers.Contract(contractAddress,contractAbi,signer);
     return {contractInstance,selectedAccount}
 } catch (error) {
    toast.error("Wallet connection failed")
    console.error(error)
 }
}
