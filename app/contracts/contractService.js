import { web3, tokenContract } from './tokenContract';
import { saleContract } from './crowdsaleContract';
import { toast } from 'react-toastify';
import api from 'utils/api';
const approveUserRequest = async (sender, receiver) => new Promise(async (resolve, reject) => {
  try {
    const isOwner = await checkIfowner();
    if (isOwner) {
      const accounts = await web3.eth.getAccounts();
      const currentAddress = accounts[0];
      tokenContract.methods.approveTransfer(sender, receiver).send({ from: currentAddress })
        .on('transactionHash', (hash) => {
          resolve(hash);
        })
        .on('error', (error) => reject(error));
    } else {
      reject('Please load owner address in metamask');
    }
  } catch (error) {
    console.log('ehggg', error);

    reject(error);
  }
});

const transfer = async (sender, receiver, amount) => new Promise(async (resolve, reject) => {
  try {
    await tokenContract.methods.transfer(receiver, amount).send({ from: sender });
    resolve(true);
  } catch (error) {
    console.log('ehggg', error);

    reject(error);
  }
});

const isCrowdsaleRunning = async () => new Promise(
  async (resolve, reject) => {
    try {
      const isRunning = await saleContract.methods.crowdsalestarted.call();
      if (isRunning) {
        resolve(true);
      } else {
        reject('You cannot transfer before crowdsale ends');
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

const balanceOf = async (sender) => new Promise(
  async (resolve, reject) => {
    try {
      const balance = await tokenContract.methods.balanceOf(sender).call();
      console.log(balance);
      resolve(balance);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });


// const rejectUserRequest = async (sender, receiver) => new Promise(async (resolve, reject) => {
//   try {
//     const isOwner = await checkIfowner();
//     if (isOwner) {
//         const accounts = await web3.eth.getAccounts();
//         const currentAddress = accounts[0];
//         await tokenContract.methods.approveTransfer().send({
//           from:currentAddress
//        });
//     } else {

//     }
//   } catch (error) {

//   }
// });

const checkIfowner = async () => new Promise(
  async (resolve, reject) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const currentAddress = accounts[0];
      const owner = await tokenContract.methods.owner().call();
      if (owner === currentAddress) {
        resolve(true);
      } else {
        reject('Please load owner address in metamask');
      }
    } catch (error) {
      reject(error);
    }
  });

const checkIfAddressLoaded = async (sender) => new Promise(
  async (resolve, reject) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const currentAddress = accounts[0];
      if (sender === currentAddress) {
        resolve(true);
      } else {
        reject('Please load sender address in metamask');
      }
    } catch (error) {
      console.log(error);
      reject('Please load sender address in metamask');
    }
  });

const sendEther = async (amount) => new Promise(
  async (resolve, reject) => {
    try {
      
      const exchange = await tokenContract.methods.exchangeAddress().call();
      const accounts = await web3.eth.getAccounts();
      const sender = accounts[0];
      const txHash = web3.eth.sendTransaction({ from: sender, to: exchange, value: web3.utils.toWei(amount.toString(), 'ether') });
      resolve(txHash);
    } catch (error) {
      console.log(error);
      reject('Please load sender address in metamask');
    }
  });


const sendTokensToExchange = async (tokens) => new Promise(
  async (resolve, reject) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const exchange = await tokenContract.methods.exchangeAddress().call();
      const sender = accounts[0];
      tokenContract.methods.transfer(exchange, tokens).send({ from: sender })
        .on('transactionHash', (hash) => {
          resolve(hash);
        })
        .on('error', (error) => reject(error));
    } catch (error) {
      console.log(error);
      reject('Please load sender address in metamask');
    }
  });

  const dollarToEther = async (dollars) => new Promise(
    async (resolve, reject) => {
      try {
        const result = await api.user.etherToDollar();
        let price = result.ticker.price;
        let ether = dollars/price;
        resolve(ether);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });


export { approveUserRequest, isCrowdsaleRunning, balanceOf, transfer, checkIfAddressLoaded, sendEther, sendTokensToExchange, dollarToEther };
