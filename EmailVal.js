function ValidateEmail(email) {
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (email.value.match(mailformat)) {
		document.form1.email.focus();
	} else {
		alert("You have entered an invalid email address!");
		document.form1.email.focus();
	}
}

function phonenumber(inputtxt) {
	var phoneno = /^\d{10}$/;
	if (inputtxt.value.match(phoneno)) {
		document.form1.email.focus();
	} else {
		alert("Not a valid Phone Number");
		document.form1.email.focus();
	}
}

function formValidation(){

	var email =  document.getElementById('email');
	ValidateEmail(email)
	var number =  document.getElementById('number');
	phonenumber(number)
}