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
  UserPoolId: 'eu-west-1_DsAyjIujQ',
  ClientId: '1pmbpccisctbvgq401m959k94f'
}

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

var userData = {
  Username: 'bonzia',
  Pool: userPool
}

var cognitoUser

function signUpUser2 () {
  var attribute = {
    Name: 'email',
    Value: 'email@mydomain.com'
  }

  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
    attribute
  )
  var attributeList = []

  attributeList.push(attributeEmail)
  var cognitoUser

  userPool.signUp('username', 'password', attributeList, null, function (
    err,
    result
  ) {
    if (err) {
      alert(err)
      return
    }
    cognitoUser = result.user
  })
}

function signUpUser () {
  var attributeList = []

  var dataEmail = { Name: 'email', Value: 'email@mydomain.com' }
  var dataPhoneNumber = { Name: 'phone_number', Value: '+15555555555' }

  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
    dataEmail
  )
  var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
    dataPhoneNumber
  )

  attributeList.push(attributeEmail)
  attributeList.push(attributePhoneNumber)

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
}

function getUserFromLocalStorage () {
  cognitoUser = userPool.getCurrentUser()

  if (cognitoUser != null) {
    cognitoUser.getSession(function (err, session) {
      if (err) {
        alert(err)
        return
      }
      console.log('session validity: ' + session.isValid())
    })
  }
}

function authenticateUser () {
  var authenticationData = {
    Username: 'username',
    Password: 'password'
  }
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  )
  var poolData = {
    UserPoolId: 'us-east-1_TcoKGbf7n',
    ClientId: '4pe2usejqcdmhi0a25jp4b5sh3'
  }
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
  var userData = {
    Username: 'username',
    Pool: userPool
  }
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      var accessToken = result.getAccessToken().getJwtToken()

      /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
      var idToken = result.idToken.jwtToken
    },

    onFailure: function (err) {
      alert(err)
    }
  })
}
