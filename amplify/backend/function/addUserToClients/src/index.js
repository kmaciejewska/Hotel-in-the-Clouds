exports.handler = function afterConfirmationTrigger(event, context, callback) {
  const AWS = require('aws-sdk');
  const cognitoISP = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18'
  });

  const params = {
    GroupName: 'Clients',
    UserPoolId: event.userPoolId,
    Username: event.userName
  };

  cognitoISP
    .adminAddUserToGroup(params)  //add the user to specified group
    .promise()
    .then(() => callback(null, event))  //return to amazon cognito
    .catch(err => callback(err, event));
};
