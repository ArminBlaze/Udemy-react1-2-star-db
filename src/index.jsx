getUrl('https://swapi.co/api/people/0/')
.then(console.log)
.catch((err) => {
	console.error(err)
})


async function getUrl(url) {
	const response = await fetch(url);
	
	if(!response.ok) throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`)
	
	const json = await response.json();
	return json;
}