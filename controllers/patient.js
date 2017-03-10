const Patient = require('../models/Patient');
exports.index = (req, res) => {
  res.render('index');
}
exports.post= (req,res) => {
  const newPatient=new Patient({
    FirstName:req.body.FirstName,
    LastName:req.body.LastName,
    Age:req.body.Age,
    DOB:req.body.DOB,
    Gender:req.body.Gender,
    Phone:req.body.Phone,
    Text:req.body.Text,
  })
  newPatient.save(function(err){
    if(err) throw err;
    res.redirect("/getDirectory");
  })
}
exports.getDirectory = (req, res) => {
  console.log("get");
  Patient.find({},function(err,data){
    if(err) throw err;
    res.render('getDirectory',{
      title:'directory',
      obj:data
    })
  })
}
