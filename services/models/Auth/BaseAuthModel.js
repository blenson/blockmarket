const mongoose = require('mongoose');

const BaseAuthSchema = new mongoose.Schema({
});

const BaseAuthModel = mongoose.model( "BaseAuth", BaseAuthSchema, "auth" );

module.exports = BaseAuthModel
