var IOTA = require('iota.lib.js');
var config = require('./config');

var iotajs = new IOTA({
  'host': 'http://148.251.233.147',
  'port': 14265
});

//Takes a list of seeds and generates the first X addresses for each seed. 
function generateAddresses() {

  var returnedAdresses = []; //This Variable will get popullated with the generated addresses of all seeds


  for (i = 0; i < config.seeds.length;) {
    iotajs.api.getNewAddress(config.seeds[i], {'index': 0, 'total': config.nAddr}, function(_, addresses) {
      console.log(addresses);
      //returnedAdresses.concat(addresses);
      console.log(addresses); //Logs all generated addresses
      getBalance(addresses); //Calls the getBalance function with all generated addresses as argument 
      i++
    });
  };

  //log(returnedAdresses); //Logs all generated addresses
};



//Takes a list of addresses as argument and should get the balance for each address
function getBalance(addresses) {
  iotajs.api.getBalances(addresses, 100, function(error, inputs) {

    var totalValue = 0;
    console.log(error);
    console.log(inputs.balances);
    inputs.balances.forEach(function(balance) {
      totalValue += parseInt(balance);
      console.log(totalValue); //Should log the balance of each address
    })
  });
};
generateAddresses();
