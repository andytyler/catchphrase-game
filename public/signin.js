var AmazonCognitoIdentity = require('amazon-cognito-identity-js')

const usernameElement = document.getElementById('username')
const passwordElement = document.getElementById('password')
const upUsernameElement = document.getElementById('upUsername')
const upPasswordElement = document.getElementById('upPassword')

const usernameText = usernameElement.innerText
const passwordText = passwordElement.innerText
const upUsernameText = upUsernameElement.innerText
const upPasswordText = upPasswordElement.innerText

var poolData = {
  UserPoolId: 'us-east-1_Iqc12345',
  ClientId: '12345du353sm7khjj1q'
}

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

var userData = {
  Username: 'bonzia',
  Pool: userPool
}

var attributeList = []

var dataEmail = {
  Name: 'email',
  Value: 'email@mydomain.com'
}
var dataPhoneNumber = {
  Name: 'phone_number',
  Value: '+15555555555'
}

var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail)
var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
  dataPhoneNumber
)

attributeList.push(attributeEmail)
attributeList.push(attributePhoneNumber)

var cognitoUser
userPool.signUp('username', 'password', attributeList, null, function (
  err,
  result
) {
  if (err) {
    console.error(err)
    return
  }
  cognitoUser = result.user
  console.log('user name is ' + cognitoUser.getUsername())
})
