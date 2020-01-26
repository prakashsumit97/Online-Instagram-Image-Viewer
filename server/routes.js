let LoginController = require("./controllers/LoginController");
let imageController = require('./controllers/image')




module.exports = function(app) {

    app.all('/', function(req, res) {
        res.sendFile('index.html', { root: './public/pages/' });
    });

    function loginAuth(req, res, next) {
        if (!req.session.loggedInUser) {
            res.status(HttpStatus.UNAUTHORIZED).json({ unAuthMsg: 'You must login first!' });
        } else {
            req.session.save();
            next();
        }
    }
    //Login Routes
    app.post("/authenticate", LoginController.authenticate);
    app.post("/logout", LoginController.logout);
    app.get("/loggedInUser", LoginController.getLoggedInUser);

    app.get("/image", loginAuth, imageController.getImage);

};