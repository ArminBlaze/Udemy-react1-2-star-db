//класс-сервис. Весь код работы с сервером будет внутри него
class SwapiService {
	
	_apiBase = `https://swapi.co/api`;
	
	async getUrl(url) {
		const response = await fetch( `${this._apiBase + url}` );

		if(!response.ok) throw new Error(`Ошибка сервера: ${response.status} ${response.statusText} \nЗапрашиваемый адрес: ${response.url}`)

		const json = await response.json();
		return json;
	}
	
	async getAllPeople() {
		const res = await this.getUrl('/people/');
		return res.results.map(this._transformPerson);
	}
	
	async getPerson(id) {
		let person = await this.getUrl(`/people/${id}/`);
		return this._transformPerson(person);
	}

	async getAllPlanets() {
		const res = await this.getUrl('/planets/');
		return res.results.map(this._transformPlanet);
	}
	
	async getPlanet(id) {
		let planet = await this.getUrl(`/planets/${id}/`);
		return this._transformPlanet(planet);
	}

	async getAllStarships() {
		const res = await this.getUrl('/starships/');
		return res.results.map(this.__transformSpaceship);
	}
	
	async getStarship(id) {
		let ship = this.getUrl(`/starships/${id}/`);
		return this._transformSpaceship(ship);
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