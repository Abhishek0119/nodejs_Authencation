const forgotPassword = require('./src/forgotPassword');
const loginUser = require('./src/loginUser');
const registration = require('./src/registration');

module.exports = function (app) {
	
   // app.use('/forgotPassword',forgotPassword);
    app.use('/login',loginUser);
    app.use('/registration',registration);

}
