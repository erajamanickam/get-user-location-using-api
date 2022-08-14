const button = document.querySelector("button");

button.addEventListener("click", ()=>{

    document.getElementById('location-details').style.cssText = 'display: block';

    if(navigator.geolocation){
        button.innerText = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        button.innerText = "Your browser not support";
    }
});

function onSuccess(position){
    button.innerText = "Loading...";
    let {latitude, longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=22bd5666755f4eec845d92ac3a131e05`)
    .then(response => response.json()).then(response =>{
        let allDetails = response.results[0].components;
        let {city, postcode, continent, country, road, state, state_code, state_district} = allDetails;
        button.innerText = `Yout location details`;
		
        document.getElementById("city").innerHTML =  `${city}`;
        document.getElementById("postcode").innerHTML =  `${postcode}`;
		document.getElementById("continent").innerHTML =  `${continent}`;
        document.getElementById("country").innerHTML =  `${country}`;
        document.getElementById("road").innerHTML =  `${road}`;
        document.getElementById("state").innerHTML =  `${state}`;
        document.getElementById("state_code").innerHTML =  `${state_code}`;
        document.getElementById("state_district").innerHTML =  `${state_district}`;

    }).catch(()=>{
        button.innerText = "Something went wrong";
    });
}

function onError(error){
    if(error.code == 1){
        button.innerText = "You denied the request";
    }else if(error.code == 2){
        button.innerText = "Location is unavailable";
    }else{
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
}