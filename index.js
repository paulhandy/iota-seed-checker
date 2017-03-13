var IOTA = require('iota.lib.js');
var config = require('./config');

var iotajs = new IOTA({
  'host': config.uri,
  'port': config.port
});

//Takes a list of seeds and generates the first X addresses for each seed. 
function generateAddresses() {

  for (i = 0; i < config.seeds.length; i++) {
    iotajs.api.getNewAddress(config.seeds[i], {'index': 0, 'total': config.nAddr}, function(_, addresses) {
      
      getBalance(addresses); //Calls the getBalance function with all generated addresses as argument 
      
    });
  };
};



//Takes a list of addresses as argument and should get the balance for each address
function getBalance(addresses) {
  iotajs.api.getBalances(addresses, 100, function(error, inputs) {
	var i = 0; 
	var totalValue = 0; 
    inputs.balances.forEach(function(balance) {
		totalValue += parseInt(balance); 
		if (parseInt(balance) > 0) {
			console.log(i+1 + " The address " + addresses[i] + " has a balance of: " + parseInt(balance));
			console.log("Balance detected!!!");
		} else {
			console.log(i+1 + " The address " + addresses[i] + " has a balance of: " + parseInt(balance));
		};
	i++
    })
	console.log("All addresses of this seeds contain " + totalValue + " tokens!")
  });
};
generateAddresses();
