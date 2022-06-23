window.addEventListener("load", onPageLoad);
document.getElementById("registerButton").addEventListener("click", onRegister);

function onPageLoad(){
    document.getElementById("registerButton").disabled = false;
    let authToken = localStorage.getItem("auth-token");

    if (authToken != null){
        getRequest(validateSessionUri);
    }
    else
    {
        if ( document.getElementsByClassName('login-page').length > 0)
            document.getElementsByClassName('login-page')[0].innerHTML = '<div class="form"><form class="login-form"><input id="username" type="text" placeholder="username"/><input id="password" type="password" placeholder="password"/><input id="repeat-password" type="password" placeholder="repeat-password"/><button id="registerButton">register</button></form></div>';
        else
            return;
    }
}

function onRegister() {
    let login = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let repass = document.getElementById("repeat-password").value;

    if (login == null ||
        pass == null ||
        pass == repass ||
        login.length < 3 ||
        pass.length < 3)
    {
        alert("Login and password, should be longer (3+ symbols)");
        document.location.reload();
    }
    else{

        postRequest(registerUri, JSON.stringify(
            {
                Login: username,
                Password: pass,
                RepeatPassword: repass
            }
            ));

       document.getElementById("registerButton").disabled = true;
    }
  }

  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4) {
        if (xhr.status === 200 && xhr.getResponseHeader("auth-token") != null) {
            document.getElementsByClassName('login-page')[0].innerHTML = '<h1 class="display-4">Logged!</h1>';
            if (xhr.responseURL == credentialsAuthUri) {
                localStorage.setItem("auth-token", xhr.getResponseHeader("auth-token"))
            }
        } else if (xmlHttpRequest.status === 400 || xmlHttpRequest.status === 404) {
            document.getElementsByClassName('login-page')[0].innerHTML = '<div class="form"><form class="login-form"><input id="username" type="text" placeholder="username"/><input id="password" type="password" placeholder="password"/><input id="repeat-password" type="password" placeholder="repeat-password"/><button id="registerButton">register</button></form></div>';
        }
    }
  }