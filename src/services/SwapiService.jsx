//класс-сервис. Весь код работы с сервером будет внутри него
class SwapiService {
	
	_apiBase = `https://swapi.co/api`;
	
	async getUrl(url) {
		const response = await fetch( `${this._apiBase + url}` );

		if(!response.ok) throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`)

		const json = await response.json();
		return json;
	}
	
	async getAllPeople() {
		const res = await this.getUrl('/people/');
		return res.results;
	}
	
	getPerson(id) {
		return this.getUrl(`/people/${id}/`)
	}

	async getAllPlanets() {
		const res = await this.getUrl('/planets/');
		return res.results;
	}
	
	getPlanet(id) {
		return this.getUrl(`/planets/${id}/`)
	}

	async getAllStarships() {
		const res = await this.getUrl('/starships/');
		return res.results;
	}
	
	getStarship(id) {
		return this.getUrl(`/starships/${id}/`)
	}
}

export default SwapiService;