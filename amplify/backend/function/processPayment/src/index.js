const { CognitoIdentityServiceProvider } = require("aws-sdk");
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const USER_POOL_ID = "us-west-2_OZvVzj5iY";
const stripe = require("stripe")("sk_test_51I58aTI3sLQDWoOaFuslbpe1M9WNN7meIfOs81pvYR1HQl5XYF3NPJzDHwgeAsGRQtVl5RuXjDniljTe76XyN6F100iEz3i1Jq");

const getUserEmail = async (event) => {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: event.identity.claims.username
  };
  const user = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
  const { Value: email } = user.UserAttributes.find((attr) => {
    if (attr.Name === "email") {
      return attr.Value;
    }
  });
  return email;
};

/*
 * Get the total price of the order
 * Charge the customer
 */
exports.handler = async (event) => {
  try {
    const { id, cart, dateFrom, dateTo, total, token } = event.arguments.input;
    const { username } = event.identity.claims; //we set it separately beacause it is not in the input - line 9
    const email = await getUserEmail(event);

    await stripe.charges.create({
      amount: total * 100,
      currency: "usd",
      source: token,
      description: `Booking ${new Date()} by ${username} with ${email}`
    });
    return { id, cart, dateFrom, dateTo, total, username, email };
  } catch (err) {
    throw new Error(err);
  }
};