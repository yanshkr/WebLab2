window.addEventListener("load", onPageLoad);
document.getElementById("loginButton").addEventListener("click", onLogin);

function onPageLoad(){
    document.getElementById("loginButton").disabled = false;
    let authToken = localStorage.getItem("auth-token");

    if (authToken != null){
        getRequest(validateSessionUri);
    }
    else
    {
        if ( document.getElementsByClassName('login-page').length > 0)
            document.getElementsByClassName('login-page')[0].innerHTML = '<div class="form"><form class="login-form"><input type="text" id="username" placeholder="username"/><input type="password" id="password" placeholder="password"/><button id="loginButton">login</button><p class="message">Not registered? <a href="./Registation.html">Create an account</a></p></form></div>';
        else
            return;
    }
}

function onLogin() {
    let login = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (login == null ||
        pass == null ||
        login.length < 3 ||
        pass.length < 3)
    {
        alert("Login and password, should be longer (3+ symbols)");
        document.location.reload();
    }
    else{

        postRequest(credentialsAuthUri, JSON.stringify(
            {
                Login: username,
                Password: pass
            }
            ));

       document.getElementById("loginButton").disabled = true;
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
            document.getElementsByClassName('login-page')[0].innerHTML = '<div class="form"><form class="login-form"><input type="text" id="username" placeholder="username"/><input type="password" id="password" placeholder="password"/><button id="loginButton">login</button><p class="message">Not registered? <a href="./Registation.html">Create an account</a></p></form></div>';
        }
    }
  }