var mongoose = require('mongoose');
	// assert = require('assert');
require('dotenv').load();

mongoose.connect(process.env.DB_CONNECTION);

var Any = new mongoose.Schema({ any: mongoose.Schema.Types.Mixed },{ strict: false });
function dataInit(db){
  return mongoose.model('Data', Any, db);
}

function DB_close(db){
	return mongoose.disconnect();
}

function DB_collections(){
	// return mongodb.db.getCollection();
	// return mongoose.Connection.prototype.collection("somepanda");
}

exports.dataInit = dataInit;
exports.DB_close = DB_close;
exports.DB_collections = DB_collections;