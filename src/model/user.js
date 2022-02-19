const {client} = require("pg")

const client = new client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'rootuser',
  db: 'postgres',
})

client.connect();


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const menuSchema = new Schema({
//   full_name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phone_number: {
//     type: Number,
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
// }, { timestamps: true });

// const Menu = mongoose.model('Menu', menuSchema);
// module.exports = Menu;