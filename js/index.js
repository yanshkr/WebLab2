window.addEventListener("load", onPageLoad);
document.getElementById("btn-resume").addEventListener("click", btnResume);
document.getElementById("btn-pause").addEventListener("click", btnPause);
document.getElementById("btn-reset").addEventListener("click", btnReset);
document.getElementById("clock-c").addEventListener("click", setClock);

var timer;
var countDownDate;

function onPageLoad(){
    let authToken = localStorage.getItem("auth-token");

    if (authToken != null){
        getRequest(getAlarmsUri);
    }
}

xhr.onreadystatechange = function(){
   if (xhr.readyState === 4) {
      if (xhr.status === 200) {
          if (xhr.responseURL == getAlarmsUri) {
            JSON.parse(xhr.responseText, 
              function(k, v) {
                  if (k == "EndTime") {countDownDate = v;};         
                });
          }
      }
  }
}

function btnResume(){
  timer = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
  
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    if (distance > 0) {
      document.getElementById("dayEl").innerText = days;
      document.getElementById("hrEl").innerText = hours;
      document.getElementById("minEl").innerText = minutes;
      document.getElementById("secEl").innerText = seconds;
    }
  }, 1000);
}

function btnPause(){
  clearInterval(timer);
}

function btnReset(){
      document.getElementById("dayEl").innerText = 0;
      document.getElementById("hrEl").innerText = 0;
      document.getElementById("minEl").innerText = 0;
      document.getElementById("secEl").innerText = 0;
}

function validate_date(date) {
  var str = date.trim().split("/");
  if (str.length == 3) {
      str = new Date(str[2], str[0] - 1, str[1], 0, 0, 0);
      if (str == 'Invalid Date') return false;
      str = [("0" + (str.getMonth() + 1)).substr(-2), ("0" + str.getDate()).substr(-2), str.getFullYear()].join("/");
      return str === date.trim()
  }
  return false
};

function setClock(){
  var resp = validate_date(window.prompt("Please input date."));
  if(typeof resp === 'object'){
    countDownDate = resp;
    if (localStorage.getItem("auth-token") != null){
    postRequest(addAlarmUri, JSON.stringify(
      {
        AuthToken: localStorage.getItem("auth-token"),
        EndTime: countDownDate,
        Status: 0
      }
    ));
    }
  }
  else{
    alert("Pls input right date.");
  }
}