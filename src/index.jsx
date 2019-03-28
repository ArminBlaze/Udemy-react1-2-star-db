getUrl('https://swapi.co/api/people/1/')
.then(console.log)


async function getUrl(url) {
	const response = await fetch(url);
	const json = await response.json();
	return json;
}