import { useState } from 'react';
import { connectWallet, donate, applyForScholarship, releaseFunds } from './util/web3';
   function App() {
     const [account, setAccount] = useState('');

     const handleConnectWallet = async () => {
       const accounts = await connectWallet();
       if (accounts) setAccount(accounts[0]);
     };

     return (
       <div className="min-h-screen bg-gray-100 flex justify-center items-center">
         <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
           <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
             Decentralized Scholarship Funding
           </h1>
           <button
             onClick={handleConnectWallet}
             className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4"
           >
             Connect Wallet
           </button>
           <p className="text-gray-600 mb-4">Connected: {account || 'Not connected'}</p>
           <div className="mb-6">
             <h2 className="text-lg font-semibold text-gray-700 mb-2">Donate ETH</h2>
             <input
               type="text"
               id="donationAmount"
               placeholder="Amount in ETH"
               className="w-full p-2 border border-gray-300 rounded-md mb-2"
             />
             <button
               onClick={() => {
                donate(document.getElementById('donationAmount').value)
                console.log(document.getElementById('donationAmount').value)
                
               }}
               className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
             >
               Donate
             </button>
           </div>
           <div className="mb-6">
             <h2 className="text-lg font-semibold text-gray-700 mb-2">Apply for Scholarship</h2>
             <button
               onClick={applyForScholarship}
               className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
             >
               Apply
             </button>
           </div>
           <div>
             <h2 className="text-lg font-semibold text-gray-700 mb-2">Release Funds (Admin Only)</h2>
             <input
               type="text"
               id="recipientAddress"
               placeholder="Recipient Address"
               className="w-full p-2 border border-gray-300 rounded-md mb-2"
             />
             <input
               type="text"
               id="releaseAmount"
               placeholder="Amount in ETH"
               className="w-full p-2 border border-gray-300 rounded-md mb-2"
             />
             <button
               onClick={() =>
                 releaseFunds(
                   document.getElementById('recipientAddress').value,
                   document.getElementById('releaseAmount').value
                 )
               }
               className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
             >
               Release
             </button>
           </div>
         </div>
       </div>
     );
   }

   export default App;