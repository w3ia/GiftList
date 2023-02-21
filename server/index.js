const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
// create the merkle tree for the whole nice list
const MERKLE_ROOT = "ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa";

app.post('/gift', (req, res) => {
  const name = req.body.name;
  const proof = req.body.proof;

  const isInTheList = verifyProof(proof, name , MERKLE_ROOT)
  
  if(isInTheList) {
    res.send("Yes! You are on the list. You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
