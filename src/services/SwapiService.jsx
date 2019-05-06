//класс-сервис. Весь код работы с сервером будет внутри него
class SwapiService {
	
	_apiBase = `https://swapi.co/api`;
	_imageBase = `https://starwars-visualguide.com/assets/img`;
	
	getUrl = async (url) => {
		const response = await fetch( `${this._apiBase + url}` );

		if(!response.ok) throw new Error(`Ошибка сервера: ${response.status} ${response.statusText} \nЗапрашиваемый адрес: ${response.url}`)

		const json = await response.json();
		return json;
	}
	
	getAllPeople = async () => {
		const res = await this.getUrl('/people/');
		return res.results.map(this._transformPerson);
	}
	
	getPerson = async (id) => {
		let person = await this.getUrl(`/people/${id}/`);
		return this._transformPerson(person);
	}

	getAllPlanets = async () => {
		const res = await this.getUrl('/planets/');
		return res.results.map(this._transformPlanet);
	}
	
	getPlanet = async (id) => {
		let planet = await this.getUrl(`/planets/${id}/`);
		return this._transformPlanet(planet);
	}

	getAllStarships = async () => {
		const res = await this.getUrl('/starships/');
		return res.results.map(this._transformSpaceship);
	}
	
	getStarship = async (id) => {
		let ship = await this.getUrl(`/starships/${id}/`);
		return this._transformSpaceship(ship);
	}

	
	//функции получения url-картинок
	getPersonImage = ({id}) => {
		return `${this._imageBase}/characters/${id}.jpg`
	}

	getStarshipImage = ({id}) => {
		return `${this._imageBase}/starships/${id}.jpg`
	}

	getPlanetImage = ({id}) => {
		return `${this._imageBase}/planets/${id}.jpg`
	}


	//выделяем отдельный метод для получения id из url объекта пришедшего от api
	_getIdFromUrl(item) {
		//ищём цифры в ссылке типа https://swapi.co/api/planets/10/
		//нам нужны цифры в конце ссылки и между двумя слешами
		//находим два слеша в конце строки и забираем цифры в скобочную группу
		let idRegexp = /(\d*)\/$/;
		//в результате будет массив [0] - весь результат со слешами, [1] только цифры внутри скобочной группы
		return item.url.match(idRegexp)[1];
	}

	_transformPlanet = (planet) => {
		let id = this._getIdFromUrl(planet);

		return	{
			name: planet.name,
			population: planet.population,
			diameter: planet.diameter,
			rotationPeriod: planet.rotation_period,
			id: id,
		}
	}

	_transformSpaceship = (ship) => {
		let id = this._getIdFromUrl(ship);

		return	{
			name: ship.name,
			model: ship.model,
			manufacturer: ship.manufacturer,
			cost: ship.cost_in_credits,
			length: ship.length,
			crew: ship.crew,
			passengers: ship.passengers,
			cargoCap: ship.cargo_capacity,
			id: id,
		}
	}

	_transformPerson = (person) => {
		let id = this._getIdFromUrl(person);

		return	{
			name: person.name,
			eyeColor: person.eye_color,
			gender: person.gender,
			birthYear: person.birth_year,
			id: id,
		}
	}
}

export default SwapiService;