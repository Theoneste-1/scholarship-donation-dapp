
import Web3 from 'web3';

import contractABI from '../contracts/Scholarship.json';

   let web3;
   let contract;
   let accounts;

   export async function connectWallet() {
    const contractAddress = '0x8D0E31dACAc36223C6f8DEC4D77E0111511242d1'
     if (window.ethereum) {
       web3 = new Web3(window.ethereum);
       try {
         accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
         contract = new web3.eth.Contract(contractABI.abi, contractAddress);
         return accounts;
       } catch (error) {
         console.error('User denied account access', error);
         return null;
       }
     } else {
       console.error('MetaMask not detected');
       return null;
     }
   }

   export async function donate(amount) {
     if (!contract || !accounts) {
       console.error('Wallet not connected');
       return;
     }
     try {
       const weiAmount = web3.utils.toWei(amount, 'ether');
       await contract.methods.donate().send({ from: accounts[0], value: weiAmount });
       console.log('Donation successful');
     } catch (error) {
       console.error('Donation failed', error);
     }
   }

   export async function applyForScholarship() {
     if (!contract || !accounts) {
       console.error('Wallet not connected');
       return;
     }
     try {
       await contract.methods.applyForScholarship().send({ from: accounts[0] });
       console.log('Application successful');
     } catch (error) {
       console.error('Application failed', error);
     }
   }

   export async function releaseFunds(recipient, amount) {
     if (!contract || !accounts) {
       console.error('Wallet not connected');
       return;
     }
     try {
       const weiAmount = web3.utils.toWei(amount, 'ether');
       await contract.methods.releaseFunds(recipient, weiAmount).send({ from: accounts[0] });
       console.log('Funds released successfully');
     } catch (error) {
       console.error('Funds release failed', error);
     }
   }