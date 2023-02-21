const axios = require('axios');
const prompt = require('prompt-sync')();
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const merkleTree = new MerkleTree(niceList);

async function checkList(name, proof) {
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: name,
    proof: proof
  });

  return gift;
}

async function main() {
  const name = prompt('What is your name? ');
  console.log(`Hey there ${name}, let's check if you are on the gift list...`);
  
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  console.log(await checkList(name, proof));
}

main();
