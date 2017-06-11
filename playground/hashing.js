const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
};
// How JWT tokens work

var token = jwt.sign(data, 'somesalt');
console.log(`Token: ${token}`);

var decoded = jwt.verify(token, 'somesalt');
console.log(`Decoded:` + JSON.stringify(decoded, undefined, 2));
// How hashing works
//
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
// //
// HOW TOKENS WORK, ALONG WITH HOW YOU SALT A HASH TO GIVE THE TOKEN A LAYER OF PROTECTION FROM HASH PROTECTION
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
// // JWT - JSON Web Token
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if(resultHash === token.hash) {
//   console.log('Data was not changed, token is good');
// } else {
//   console.log('Data was changed, do not trust');
// }
