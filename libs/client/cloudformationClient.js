const {fromIni} = require("@aws-sdk/credential-provider-ini");
const { CloudFormationClient } = require("@aws-sdk/client-cloudformation");

const cloudformationClient = new CloudFormationClient({ 
  region: "ap-southeast-1",
  credentials: fromIni({profile: 'default'})
});

module.exports = {cloudformationClient};

