const valid = (name, email, password, confirpassword) => {
    var mensaje;
    if(!name || !email || !password){
        mensaje= 'Please add all fields.'
    }
    if(!validateEmail(email)){
        mensaje='Invalid emails.'
    }
    

    if(password.length < 6){
        mensaje='Password must be at least 6 characters.'
    }

    

    if(password !== confirpassword){
        mensaje='Confirm password did not match.'
    }
    return mensaje;
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid