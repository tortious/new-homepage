const apiKey = '80771678e5b78ecacbb79ab8151ac360';

async function openWeatherCall(url) {
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

function getDate() {
	const date = new Date();

	// weekday, month, day, year
	let wdmdy = date.toString().split(' ');

	return `${wdmdy[0]} ${wdmdy[1]} ${wdmdy[2]} ${wdmdy[3]}`;
}

function getTime() {
	let date = new Date(),
		sec = date.getSeconds(),
		min = date.getMinutes(),
		hours = date.getHours();

	return (
		'' +
		(hours < 10 ? '0' + hours : hours) +
		':' +
		(min < 10 ? '0' + min : min) +
		':' +
		(sec < 10 ? '0' + sec : sec)
	);
}

function search(e) {
	if (e.keyCode === 13) {
		let val = document.querySelector('#search-field').value;
		window.location.replace(`https://google.com/search?q=${val}`);
	}
}

window.onload = () => {
	const urlOWM = `https://api.openweathermap.org/data/2.5/weather?q=Esteio, Região Geográfica Imediata de Porto Alegre, Região Metropolitana de Porto Alegre, Região Geográfica Intermediária de Porto Alegre, RS, Região Sul, Brasil&units=metric&appid=${apiKey}`;

	const time = document.querySelector('.time');
	setInterval(() => {
		time.textContent = `${getDate()} // ${getTime()}`;
	}, 100);

	openWeatherCall(urlOWM).then(data => {
		console.log(data);
		let prefix = 'wi wi-';
		let code = data.weather[0].id;
		let icon = weatherIcons[code].icon;

		if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
			icon = 'day-' + icon;
		}

		icon = prefix + icon;

		console.log(icon);

		document
			.querySelector('.icon')
			.insertAdjacentHTML('afterbegin', `<i class="${icon}"></i>`);

		document
			.querySelector('.weather-info')
			.insertAdjacentHTML(
				'beforeend',
				`<span class="city">${
					data.name
				}</span><br><span class="temp">Atm ${data.main.temp.toFixed(
					0
				)}</span> <span class="temp">Max ${data.main.temp_max.toFixed(
					0
				)}</span> <span class="temp">Min ${data.main.temp_min.toFixed(
					0
				)}</span>`
			);
	});

	document.querySelector('#search-field').placeholder =
		uselessFacts[Math.floor(Math.random() * uselessFacts.length)];
};
