const serverEndPoint = "https://localhost:7255";

const validateSessionUri = serverEndPoint + "/api/auth/ValidateSession";
const credentialsAuthUri = serverEndPoint + "/api/auth/CredentialsAuth";
const registerUri = serverEndPoint + "/api/auth/Register";
const getAlarmsUri = serverEndPoint + "/api/auth/GetAlarms";
const addAlarmUri = serverEndPoint + "/api/auth/AddAlarm";

let xhr = new XMLHttpRequest();


function postRequest(location, data){
    xhr.open("POST", location);
    xhr.setRequestHeader("Auth", localStorage.getItem("auth-token"));
    xhr.send(data);

    xhr.responseText
}

function getRequest(location){
    xhr.open("GET", location);
    xhr.setRequestHeader("Auth", localStorage.getItem("auth-token"));
    xhr.send();
}

xhr.onerror = function() {
    alert(`Error while connecting.`);
  };