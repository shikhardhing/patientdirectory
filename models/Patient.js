const mongoose = require('mongoose')
const patientSchema=new mongoose.Schema({
  FirstName:String,
  LastName:String,
  Age:Number,
  DOB:String,
  Gender:String,
  Phone:Number,
  Text:String
})
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
