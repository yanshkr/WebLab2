window.addEventListener("load", onPageLoad);

function onPageLoad(){
    let authToken = localStorage.getItem("auth-token");

    if (authToken != null){
        getRequest(getAlarmsUri);
    }
    else
    {
        if ( document.getElementsByClassName('px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center').length > 0)
            document.getElementsByClassName('px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center')[0].innerHTML = '<h1 class="display-4">Please, login!</h1>';
        else
            return;
    }
}

  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4) {
        if (xhr.status === 200 && xhr.getResponseHeader("auth-token") != null) {
            document.getElementsByClassName('px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center')[0].innerHTML = '<h1 class="display-4">Profile</h1>';
            if (xhr.responseURL == getAlarmsUri) {
                let tableInner = '<thead><tr><th scope="col">#</th><th scope="col">EndTime</th><th scope="col">Status</th></tr></thead><tbody>';
                let counter = 0;
                JSON.parse(xhr.responseText, 
                function(k, v) {
                    if (k == "EndTime") {tableInner += '<td>' + v + '</td>';};   
                    if (k == "Status") {tableInner += '<td>' + v + '</td>';};           
                  });

                tableInner += "</tbody>";

                document.getElementsByClassName('table')[0].innerHTML = tableInner;
            }
        } else if (xmlHttpRequest.status === 400 || xmlHttpRequest.status === 404) {
            document.getElementsByClassName('px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center')[0].innerHTML = '<h1 class="display-4">Please, login!</h1>';
        }
    }
  }