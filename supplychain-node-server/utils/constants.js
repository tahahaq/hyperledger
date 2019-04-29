var exports = module.exports = {};

// Defining constant variables here
exports.mongodbUrl ="mongodb://admin:123456A@ds147926.mlab.com:47926/composer-sc";
// Setting up admin id
exports.adminUid = 'mulkTc7SiofwGQ7N4fJPIqwyym63';
// Namespace of the server
exports.owner_namespace = 'resource:one.timber.supplychain.Trader#';
// Hyperledger url
exports.hyperledgerUrl = 'http://104.196.194.55:3000/api/';


exports.responseMessages = {
    participantUpdated :"Successfully updated participant",
    certificateAdded : "Successfully added Certificate",
    participantCreated : "Successfully created Participant",
    passwordNotMatch: 'Password doesn\'t match - Please Retry',
    dataFetched: 'Success - Data fetched successfully',
    emailNotFound: 'Email not found - Please enter correct one',
    emailAlreadyExists: "Can't register - Email already exists",
    loggedOut: "User , Successfully logged out",
    Success: "Success",
    smsSuccess : "Successfully sent",
    notLoggedIn: "User not logged in"
};
