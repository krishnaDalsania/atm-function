var express = require('express');
const bodyParser = require('body-parser');
var app = express();

let port = 5000;
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

app.use(bodyParser.json());

let dbConnection;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  dbConnection = db.db("atmFunctionDb");
  console.log("Database created!");
  // db.close();
})

app.get('/',function(req,res) {
  // dbConnection.createCollection("transactionFields", function(err, res) {
  //   if (err) throw err;
  //   console.log("Collection created!");
  // });
  let cardObj = {
    card_number: '4242424242424242',
    pin: '1234',
    balance: 100000
  };
  dbConnection.collection("cardFields").insertOne(cardObj, function(err, res) {
    if (err) throw err;
  });
  let atmObj = {
    currency_denomination: 20000,
    count: 4
  };
  dbConnection.collection("atmFields").insertOne(atmObj, function(err, res) {
    if (err) throw err;
  });
})

app.post('/cardVerification',function(req,res) {
  //console.log('req.body',req.body)

  dbConnection.collection('cardFields').findOne(req.body, function(err, result) {
    // console.log('result',result)
    if (result !== null) {
        res.status(200).json({ success: 'Valid Card' })
    }
    else {
      res.status(500).json({ error: 'Invalid Credentials' })
    }
  })
})

app.post('/amountWithdraw',function(req,res) {
  // console.log('req.body',req.body)
  dbConnection.collection('atmFields').findOne({}, function(err, atmResult) {
    // console.log('atmResult',atmResult)
    dbConnection.collection('transactionFields').find({created_at: {$lte: new Date(), $gte: new Date(new Date().setHours(0, 0, 0, 0))}}).toArray(function(err, transResult) {
      // console.log('transResult',transResult.length)
      if(transResult.length == atmResult.count) {
        res.status(500).json({ error: 'Transaction Limit Exceeds' })
      }
      else if(atmResult.currency_denomination === req.body.amount) {
        res.status(500).json({ error: 'Amount Limit Exceeds' })
      }
    })
  })
  dbConnection.collection('cardFields').findOne({card_number: req.body.card_number}, function(err, result) {
    //console.log('result',result)
    if (result.balance >= req.body.amount) {
      let finalAmount = result.balance - req.body.amount
      let transactionObj = {
        created_at : new Date(),
        card_number : result.card_number,
        amount : req.body.amount
      }
      dbConnection.collection("cardFields").findOneAndUpdate({card_number: result.card_number},{ $set: { balance:finalAmount}}, function(err, cardRes) {
        dbConnection.collection("transactionFields").insertOne(transactionObj, function(err, transRes) {
          if (err) throw err;
          res.status(200).json({ balance: finalAmount })
        });
      });
    }
    else {
      res.status(500).json({ error: 'Insufficient Amount' })
    }
  })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});

