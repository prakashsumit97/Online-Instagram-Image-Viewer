/**
 * Created by karthick on 01/09/16.
 */

var User = require("../models/User");
var moment = require('moment');
var crypto = require("crypto");
var key = "supersecretkey";


exports.saveSuperAdmin = function(req, res) { //Save Super Admin

    User.findOne({ email: new RegExp('^' + "admin@instagram.com" + '$', 'i') }, function(err, user) {
        if (err) {
            console.log(err);
            return;
        }
        if (user != null) {
            console.log("Super Admin is already created..");
            return;
        }
        var newUser = new User;
        newUser.userName = 'Super';
        newUser.name = "Admin";
        newUser.email = "admin@instagram.com";
        newUser.mobileNumber = 1234567891;
        newUser.role = "SUPERADMIN";
        newUser.createdOn = moment();
        newUser.updatedOn = moment();
        newUser.password = encrypt(key, "welcome123");
        newUser.save(function(saveErr, saveUser) {
            if (saveErr) {
                console.log(saveErr);
                return;
            }
            console.log("Super Admin is created..")

        })
    })
};

function encrypt(key, data) {
    var cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf-8', 'hex');
    crypted += cipher.final('hex');
    console.log("password", data);
    return crypted;
}

// function to decryt data..............
var decryptInformation = function(KEY, encryptedText) {
    const decipher = crypto.createDecipher('aes192', KEY)
    var decrypted = decipher.update(encryptedText, 'hex', 'utf8')
    decrypted += decipher.final('utf8');
    console.log(decrypted);
    return decrypted;
}

// function to decryt data..............
var decryptInformation = function(KEY, encryptedText = 'e07e4ec7e7781e7f700a95d8b6372b7d') {
    const decipher = crypto.createDecipher('aes192', KEY)
    var decrypted = decipher.update(encryptedText, 'hex', 'utf8')
    decrypted += decipher.final('utf8');
    console.log('decrypted', decrypted);
    return decrypted;
}

// encryptInformation("sumitPrakash", "incred api key")

decryptInformation("supersecretkey", "983226bcf59406ac89d5d63fe8e010bb");
