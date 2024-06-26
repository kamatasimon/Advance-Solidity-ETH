import {useState, useEffect} from "react";
import { ethers} from "ethers";
import CONTRACT_ABI from '../../../artifacts/contracts/samples/SimpleAccountFactory.sol/SimpleAccountFactory.json'

const CONTRACT_ADDRESS = '0x8216025524e2dc04F747ba7B0badFe7a53Bdd757'

export default function HomePage() {
    const [ethWallet, setEthWallet] = useState(undefined);
    const [account, setAccount] = useState(undefined);
    const [contract, setContract] = useState(undefined);

    // Stakeholder vars
    const [address, setAddress] = useState("");
    const [salt, setSalt] = useState("");
    const [accountAddress, setAccountAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [amount, setAmount] = useState("");

    const [newaddress, setNewAddress] = useState("");
    const [newsalt, setNewSalt] = useState("");

    const contractAddress = CONTRACT_ADDRESS;
    const ABI = CONTRACT_ABI.abi;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getWallet = async() => {
        if (window.ethereum) {
        setEthWallet(window.ethereum);
        }

        if (ethWallet) {
        const account = await ethWallet.request({method: "eth_accounts"});
        handleAccount(account);
        }
    }

    const handleAccount = (account) => {
        if (account) {
        console.log ("Account connected: ", account);
        setAccount(account);
        }
        else {
        console.log("No account found");
        }
    }

    const connectAccount = async() => {
        if (!ethWallet) {
        alert('MetaMask wallet is required to connect');
        return;
        }
    
        const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
        handleAccount(accounts);
        
        // once wallet is set we can get a reference to our deployed contract
        getContract();
    };

    const getContract = () => {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const signer = provider.getSigner();
      const idmContract = new ethers.Contract(contractAddress, ABI, signer);
   
      setContract(idmContract);
    }

//   console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++')
//   console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++')

    const createAccount = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-undef
        if (!address || !maggi) return;
        try {
    
            if (typeof ethereum === "undefined") return alert("Please install Metamask");
            
            // eslint-disable-next-line no-undef
            console.log(address, maggi)
            // eslint-disable-next-line no-undef
            const newAccount = await contract.createAccount(address, maggi)
            console.log("newAccount ", newAccount)
            return true
        } catch (error) {
            reportError(error)
        }
    };


    const fundWallet = async (e) => {
        e.preventDefault();
        if (!account || !amount) return;
        try {
            if (typeof ethereum === "undefined") return alert("Please install Metamask");

            const amt = ethers.utils.parseEther(amount)
            const tx = await contract.addWalletFunds(accountAddress, {value: amt})
            console.log(tx) ;
            return true;
        } catch (error) {
            reportError(error)
        }
    };

    const getCreatedAddress = async (e) => {
        e.preventDefault();
        if (!newaddress || !newsalt) return;
        // try {
            if (typeof ethereum === "undefined") return alert("Please install Metamask");

            console.log("Connected to", newaddress, newsalt)
            const newaddress = await contract.getAddress(newaddress.toString(), newsalt);
            // console.log(Newaddress) ;
            return true;
        // } catch (error) {
        //     reportError(error)
        // }
    };

    const balanceOf = async(e) => {
        e.preventDefault();
        try {
    
        if (typeof ethereum === "undefined") return alert("Please install Metamask");

        const bal = await contract.getBalance(account)
        return bal;
        } catch (error) {
        reportError(error)
        }
    }; 

    useEffect(() => {
        if(!contract) return;
    }, [contract])

    const initUser = () => {
        // Check to see if user has Metamask
        if (!ethWallet) {
        return <p>Please install Metamask in order to continue</p>
        }

        // Check to see if user is connected. If not, connect to their account
        if (!account) {
        return (
            <button
            className='bg-orange-700 text-white py-3 px-6 rounded-lg'
            onClick={connectAccount}
            >
            Please connect your Metamask wallet
            </button>
        )
        }

        return (
            <div className="grid grid-cols-1 gap-10 mt-10">
                <div className="w-full">
                    <form
                        className="bg-white p-8 shadow-md rounded-lg mb-4 text-start"
                        onSubmit={createAccount}
                    >
                        <div className="mb-4">
                            <h4 className="text-2xl font-bold">Create an Address</h4>
                            <label htmlFor="address" className="text-md font-semibold text-orange-700 mb-2">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                className="border border-orange-300 rounded-md w-full py-2 px-3"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="maggi" className="text-md font-semibold text-orange-700 mb-2">
                                Maggi
                            </label>
                            <input
                                type="text"
                                id="maggi"
                                className="border border-orange-300 rounded-md w-full py-2 px-3"
                                placeholder="Maggi"
                                value={salt}
                                onChange={(e) => setSalt(e.target.value)}
                                required
                            />
                        </div>
                        <button
                        type="submit"
                        className="flex bg-orange-500 text-white py-2 px-4 rounded-md justify-center items-center hover:bg-green-600 transition-colors"
                        >
                        Submit
                        </button>
                    </form>
                </div>

                <div className="w-full">
                    <form
                        className="bg-white p-8 shadow-md rounded-lg text-start"
                        onSubmit={getCreatedAddress}
                    >
                        <div className="mb-4">
                        <h4 className="text-2xl font-bold">Show Address</h4>
                        <label htmlFor="newaddress" className="text-md font-semibold text-orange-700 mb-2">
                            Address
                        </label>
                        <input
                            type="text"
                            id="newaddress"
                            className="border border-orange-300 rounded-md w-full py-2 px-3"
                            placeholder="Address"
                            value={newaddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                            required
                        />
                        </div>
                        <div className="mb-4">
                        <label htmlFor="newmaggi" className="text-md font-semibold text-orange-700 mb-2">
                            Maggi
                        </label>
                        <input
                            type="number"
                            id="newmaggi"
                            className="border border-orange-300 rounded-md w-full py-2 px-3"
                            placeholder="Maggi"
                            // eslint-disable-next-line no-undef
                            value={newmaggi}
                            onChange={(e) => setNewSalt(e.target.value)}
                            required
                        />
                        </div>
                        <button
                        type="submit"
                        className="flex bg-orange-500 text-white py-2 px-4 rounded-md justify-center items-center hover:bg-green-600 transition-colors"
                        >
                        Submit
                        </button>
                    </form>
                </div>

                <div className="w-full">
                    <form
                        className="bg-white p-8 shadow-md rounded-lg mb-4 text-start"
                        onSubmit={fundWallet}
                    >
                        <h4 className="text-2xl font-bold">Fund Wallet</h4>
                        <div className="mb-4">
                        <label htmlFor="account" className="text-md font-semibold text-orange-700 mb-2">
                            Account
                        </label>
                        <input
                            type="text"
                            id="account"
                            className="border border-orange-300 rounded-md w-full py-2 px-3"
                            placeholder="Account"
                            value={accountAddress}
                            onChange={(e) => setAccountAddress(e.target.value)}
                            required
                        />
                        </div>
                        <div className="mb-4">
                        <label htmlFor="amount" className="text-md font-semibold text-orange-700 mb-2">
                            Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            className="border border-orange-300 rounded-md w-full py-2 px-3"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                        </div>
                        <button
                        type="submit"
                        className="flex bg-orange-500 text-white py-2 px-4 rounded-md justify-center items-center hover:bg-green-600 transition-colors"
                        >
                        Submit
                        </button>
                    </form>
                </div>

                <div className="w-full">
                    <form
                        className="bg-white p-8 shadow-md rounded-lg text-start"
                    onSubmit={balanceOf}
                    >
                        <h4 className="text-2xl font-bold">Show Wallet Balance</h4>
                        <div className="mb-4">
                        <label htmlFor="balance" className="text-md font-semibold text-orange-700 mb-2">
                            Account
                        </label>
                        <input
                            type="text"
                            id="balance"
                            className="border border-orange-300 rounded-md w-full py-2 px-3"
                            placeholder="Account"
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                            required
                        />
                        </div>
                        <button
                        type="submit"
                    onClick={balanceOf}
                        className="flex bg-orange-500 text-white py-2 px-4 rounded-md justify-center items-center hover:bg-green-600 transition-colors"
                        >
                        Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    useEffect(() => {getWallet();}, [getWallet]);

    return (
    <main className="container">
        <header className="my-2">
        <h1 className="text-3xl font-extrabold">Account Abstraction</h1>
        {newaddress && <h1 className="text-3xl font-extrabold">ACCOUNT: {newaddress}</h1>}
        </header>
        {initUser()}
        <style>{`
        .container {
            text-align: center
        }
        `}
        </style>
    </main>
    )
}