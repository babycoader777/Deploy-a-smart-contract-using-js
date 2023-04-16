//creation of web3 class
Web3 = require("web3");
 
// var app1 = require('./app');

//solc compiler
solc = require("solc");

const path = require('path'); // Import the 'path' module

//var session = require('express-session');

var express = require('express');
var app = express();

//file reader
fs = require("fs");


////////////////         body parser         //////////////////////////

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true}));


//setting up http provider
var web3 = new Web3('http://localhost:8545')

//reading the file
file = fs.readFileSync("/home/mangesh/Desktop/github/compansate.sol").toString();  //enter the file location of compansate.sol
//console.log(file);

//input structure for solidity compiler



var input = {
    language: "Solidity",
    sources:{
        "compansate.sol":{
            content: file
        },
    },

    settings: {
        outputSelection: {
            "*": {
                "*": ["*"]
            },
        },
    },
};

var  output = JSON.parse(solc.compile(JSON.stringify(input)));
 console.log("Result : ", output);

ABI=output.contracts['compansate.sol']['SLACompensation'].abi
bytecode=output.contracts["compansate.sol"]["SLACompensation"].evm.bytecode.object
/////////////////////////  deploy contract /////////////////////////////
// Deploy the contract
const contract = new web3.eth.Contract(ABI);
const deploy = contract.deploy({
    data: bytecode,
    arguments: [web3.eth.accounts.create().address, 100, 10]
});

var address = '0xc39315E2dFC29634bA4F27FD36e1D80BDD5dCF61'    // change the account address
var sp = '0x65001d6Fe56F1e5B1b8b248993bF789cA79D5D95'
var c1 = '0x65001d6Fe56F1e5B1b8b248993bF789cA79D5D95'
var c2 = '0x234aD92D26bE6BBE946971eF917D345d5Feda1a9'
var c3 = '0x9e05b71FF63351988F6Fa8cD37FA1885e64BA662'



/////////////////////////html nodejs  /////////////////////////////

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/compansate.html'));});

deploy.send({    from: address,
    gas: 1500000,
    gasPrice: '30000000000'
}).then((instance) => {
    console.log('Contract deployed at address:', instance.options.address);

   

    
    app.post('/pay_fees', async function(req, res) {
        var fees = req.body.time;
        const fees1 = web3.utils.toWei(fees, 'ether');
        console.log(fees1);
         // Call functions on the contract
    instance.methods.payFees(10).send({
        from: c3,
        value: fees1
    }).then(() => {
        console.log('Fees paid successfully');
        //return sleep(10000); // Sleep for 10 seconds
    }).catch((err) => {
        console.log('1Error:', err);
       // return sleep(10000); // Sleep for 10 seconds
    });
        
        console.log('pay_fees');
        //response.redirect('/last');
        

        const amt1 = await web3.eth.getBalance(address);
        const t1 = web3.utils.fromWei(amt1, 'ether');
        console.log(t1);

        const amt2 = await web3.eth.getBalance(sp);
        const t2 = web3.utils.fromWei(amt2, 'ether');
        console.log(t2);

        const amt3 = await web3.eth.getBalance(c1);
        const t3 = web3.utils.fromWei(amt3, 'ether');
        console.log(t3);

        const amt4 = await web3.eth.getBalance(c2);
        const t4 = web3.utils.fromWei(amt4, 'ether');
        console.log(t4);

        const weiAmount = await web3.eth.getBalance(c3);
        const t5 = web3.utils.fromWei(weiAmount, 'ether');
        console.log(t5);


        res.send('manager amt : '+t1+ ' sp : '+t2 + 'c1 :'+t3+ 'c2 :'+t4+'c3 :'+t5);
        
    });


    app.post('/record_violation', async function(req, res) {
        
        var index1 = req.body.index1;
         // Call functions on the contract
         instance.methods.recordViolation(index1).send({
            from: address
        }).then(() => {
            console.log('Violation recorded successfully');
            //return sleep(10000); // Sleep for 10 seconds
        }).catch((err) => {
            console.log('2Error:', err);
            //return sleep(10000); // Sleep for 10 seconds
        });
   
        console.log('record_violation');
        //response.redirect('/last');
        
        const amt1 = await web3.eth.getBalance(address);
        const t1 = web3.utils.fromWei(amt1, 'ether');
        console.log(t1);

        const amt2 = await web3.eth.getBalance(sp);
        const t2 = web3.utils.fromWei(amt2, 'ether');
        console.log(t2);

        const amt3 = await web3.eth.getBalance(c1);
        const t3 = web3.utils.fromWei(amt3, 'ether');
        console.log(t3);

        const amt4 = await web3.eth.getBalance(c2);
        const t4 = web3.utils.fromWei(amt4, 'ether');
        console.log(t4);

        const weiAmount = await web3.eth.getBalance(c3);
        const t5 = web3.utils.fromWei(weiAmount, 'ether');
        console.log(t5);


        res.send('manager amt : '+t1+ ' sp : '+t2 + 'c1 :'+t3+ 'c2 :'+t4+'c3 :'+t5);
        
    });

    app.post('/calculate_compansation', async function(req, res) {
        var index2= req.body.index2;
        
        instance.methods.calculateCompensation(index2).send({
            from: address
        }).then(() => {
            console.log('Compensation calculated successfully');
        }).catch((err) => {
            console.log('3Error:', err);
        });
   
        console.log('calculate_compansation');
        //response.redirect('/last');

        
        const amt1 = await web3.eth.getBalance(address);
        const t1 = web3.utils.fromWei(amt1, 'ether');
        console.log(t1);

        const amt2 = await web3.eth.getBalance(sp);
        const t2 = web3.utils.fromWei(amt2, 'ether');
        console.log(t2);

        const amt3 = await web3.eth.getBalance(c1);
        const t3 = web3.utils.fromWei(amt3, 'ether');
        console.log(t3);

        const amt4 = await web3.eth.getBalance(c2);
        const t4 = web3.utils.fromWei(amt4, 'ether');
        console.log(t4);

        const weiAmount = await web3.eth.getBalance(c3);
        const t5 = web3.utils.fromWei(weiAmount, 'ether');
        console.log(t5);


        res.send('manager amt : '+t1+ ' sp : '+t2 + 'c1 :'+t3+ 'c2 :'+t4+'c3 :'+t5);
        
    });



    app.post('/refund_compansation',async function(req, res) {
        var index3= req.body.index3;
        
        instance.methods.refundCompensation(index3).send({
            from: address
        }).then(() => {
            console.log('Compensation refunded successfully');
        }).catch((err) => {
            console.log('4Error:', err);
        });
        console.log('refund_compansation');
        //response.redirect('/last');

        const amt1 = await web3.eth.getBalance(address);
        const t1 = web3.utils.fromWei(amt1, 'ether');
        console.log(t1);

        const amt2 = await web3.eth.getBalance(sp);
        const t2 = web3.utils.fromWei(amt2, 'ether');
        console.log(t2);

        const amt3 = await web3.eth.getBalance(c1);
        const t3 = web3.utils.fromWei(amt3, 'ether');
        console.log(t3);

        const amt4 = await web3.eth.getBalance(c2);
        const t4 = web3.utils.fromWei(amt4, 'ether');
        console.log(t4);

        const weiAmount = await web3.eth.getBalance(c3);
        const t5 = web3.utils.fromWei(weiAmount, 'ether');
        console.log(t5);


        res.send('manager amt : '+t1+ ' sp : '+t2 + 'c1 :'+t3+ 'c2 : '+ t4 +'c3 :'+t5);
        
    });

    app.post('/pay_service', function(req, res) {
        
        instance.methods.payService().send({
            from: address
        }).then(() => {
            console.log('Service paid successfully');
        }).catch((err) => {
            console.log('5Error:', err);
        });
   
        console.log('pay_service');
        //response.redirect('/last');
        
    });
     

}).catch((err) => {
    console.log('6Error:', err);
});
app.listen(3000);