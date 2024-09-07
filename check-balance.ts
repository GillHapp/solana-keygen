// import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

// const publicKey = new PublicKey("HWSMXc8nfZd43WfBjEY6jqPvBBxqxRAuMHkignuZAfZ8");

// const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// const balanceInLamports = await connection.getBalance(publicKey);

// const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

// console.log(
//     `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
// );

// import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

// const suppliedPublicKey = process.argv[2];
// if (!suppliedPublicKey) {
//     throw new Error("Provide a public key to check the balance of!");
// }

// const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// const publicKey = new PublicKey(suppliedPublicKey);

// const balanceInLamports = await connection.getBalance(publicKey);

// const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

// console.log(
//     `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
// );

/*
process.argv:

process.argv is an array in Node.js that contains the command-line arguments passed when starting a Node.js process.
The first element (process.argv[0]) is the path to the Node.js executable.
The second element (process.argv[1]) is the path to the script being executed.
Subsequent elements (like process.argv[2] and beyond) are the additional arguments provided by the user when executing the script.
process.argv[2]:

This refers to the third element in the array, which is the first argument passed by the user to the script.
In this case, the code expects a public key (the wallet address on the Solana blockchain) as the first argument after the script name.
*/

import { Connection, LAMPORTS_PER_SOL, PublicKey, PublicKeyInitData } from "@solana/web3.js";

// Retrieve the public key from the command-line arguments
const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
    throw new Error("❌ Please provide a public key to check the balance of!");
}

// Function to check if the public key is valid
const isValidPublicKey = (key: PublicKeyInitData) => {
    try {
        new PublicKey(key);
        return true;
    } catch (error) {
        return false;
    }
};

if (!isValidPublicKey(suppliedPublicKey)) {
    throw new Error("❌ Invalid public key format! Please provide a valid Solana wallet address.");
}

const checkBalance = async () => {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const publicKey = new PublicKey(suppliedPublicKey);

    try {
        // Fetch the balance in Lamports (the smallest unit of SOL)
        const balanceInLamports = await connection.getBalance(publicKey);
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

        console.log(`✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL} SOL!`);
    } catch (error) {
        console.error("❌ Error fetching balance:", error);
    }
};

// Execute the balance check
checkBalance();
