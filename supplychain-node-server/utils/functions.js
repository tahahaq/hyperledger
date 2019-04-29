var exports = module.exports = {},
    constants = require('./constants');


// Verifying the admin by the uid
exports.isAdmin = async (admin ) => {
    try {
        if(admin.uid === constants.adminUid){
            return true;
        }
        throw new Error("Credential don't match")
    }catch (e) {
        console.log(e);
        throw new Error(e)
    }
};

