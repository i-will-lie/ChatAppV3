var express = require('express');
var registerRouter = express.Router();
const db = require("../../db/dbInterface");




registerRouter.get('/', function (req, res, next) {

    res.render('public/register', { title: 'Register' });

});

// registerRouter.get('/getPath', function (req, res, next) {

//     res.send(200, { path: "/register" });

// });

registerRouter.post("/", registerToDb, function (req, res, next) {
    res.send({ success: true, redirect: "/login" });
})



async function registerToDb(req, res, next) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;




    await db.register(email, username, password)
        .then(res => { console.log("interface res", res) })
        .catch(err => {

            res.status(401).send({ success: false, error: "Coudldnt sign up" });
        });

    next();
}

module.exports = registerRouter;