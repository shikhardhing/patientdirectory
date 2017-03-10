$(document).ready(function(){
  $(".submit").submit(function(){
    var FirstName=validator.isAlpha($("#FirstName").val());
    var LastName=validator.isAlpha($("#LastName").val());
    var Age=validator.isNumeric($("#Age").val())&&($("#Age").val()>0&&$("#Age").val()<130);
    var Phone=validator.isNumeric($("#Phone").val())&&$("#Phone").val().length>6&&$("#Phone").val().length<12;
    var Text=!validator.isAlpha($("#Text").val());
    var validity=FirstName&&LastName&&Age&&Phone&&text;
    if(validity==false){
      alert("Wrong values or some field is missing");
      return false;
    }
    return true;
  });
  $("#search").keyup(function(){
        _this = this;
        $.each($(".table tbody .firstname"), function() {
            if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
               $(this).parent().hide();
            else
               $(this).parent().show();
        });
    });
});
