var p_fs = require('./../src/p-fs')

Promise.all([
	p_fs.writeFile('test.json', JSON.stringify({'test' : 'test'})),
	p_fs.readFile('test.json', 'utf-8')
])
.then(function (data) {
	console.log(data[1]) // {"test":"test"}
})
.catch(function (err) {
	console.log(err)
})