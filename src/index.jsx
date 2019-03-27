fetch('https://swapi.co/api/people/1/')
.then(res => {
	return res.json();
})
.then(console.log)