window.addEventListener("load", () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let temperatureSection = document.querySelector(".temperature");
	const temperatureSpan = document.querySelector(".temperature span");

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			//long = position.coords.longitude;
			//lat = position.coords.latitude;
			//Hardcoding of coordinates needed for systems with firewall preventing location data : 43.6532,-79.3832
			//${lat},${long}

			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/7ed441ba4386acc0e65c33106cf800ef/43.6532,-79.3832 `;
			
			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					const { temperature, summary, icon } = data.currently;
					//Set DOM Elements from the API
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;
					//Formula for Celsius
					let celsius = (temperature - 32) * (5 / 9);
					//Set Icon
					setIcons(icon,document.querySelector(".icon"));

					//Change temperature to Celsius/Farenheit
					temperatureSection.addEventListener('click', () =>{
						if(temperatureSpan.textContent === "F"){
							temperatureSpan.textContent = "C";
							temperatureDegree.textContent = Math.floor(celsius);
						}else{
							temperatureSpan.textContent = "F";
							temperatureDegree.textContent = temperature;
						}
					});

				});
		});
	}else{
		h1.textContent = "Hey this is not working because your geolocation is off"
	}

	function setIcons(icon, iconID){
		const skycons = new Skycons({ color: "white" });
		const currentIcon =  icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
		}
});
