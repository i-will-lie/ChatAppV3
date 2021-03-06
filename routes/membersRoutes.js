const express = require('express');
const membersRouter = express.Router();
const { checkLoginToken } = require("../util/auth")


const roomRouter = require("./membersRoutes/roomsRoute");
const lobbyRouter = require("./membersRoutes/lobbyRoute");

membersRouter.use(checkLoginToken);
membersRouter.use("/lobby", lobbyRouter);
membersRouter.use("/room", roomRouter);
// membersRouter.use(checkLoginToken);

/* GET users listing. */
// membersRouter.get('/:roomID', function (req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = membersRouter;
