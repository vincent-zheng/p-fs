var fs = require('fs')

var p_fs = {}

var ErrorStringArr = {
	FileNameNotString = 'The file name must be a string!!!',
	DataNotString = 'The data must be a string!!!'
}

var syncApi = [
	'readFileSync',
	'writeFileSync'
]

// fecth the sync api
syncApi.forEach(function (functionName) {
	p_fs[functionName] = fs[functionName]
})

p_fs.readFile = function (fileName, _encoding) {
	var encoding = _encoding || 'utf-8'
	return new Promise(function (resolve, reject) {
		if (typeof fileName !== 'string') {
			reject(new Error(ErrorStringArr.FileNameNotString))
			return
		}
		fs.readFile(fileName, encoding, function (err, data) {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}

p_fs.writeFile = function (fileName, data, _options) {
	var options = _options || {}
	return new Promise(function (resolve, reject) {
		if (typeof fileName !== 'string') {
			reject(new Error(ErrorStringArr.FileNameNotString))
			return 
		}
		if (typeof data !== 'string') {
			reject(new Error(ErrorStringArr.DataNotString))
			return 
		}
		fs.writeFile(fileName, data, options, function (err) {
			if (err) {
				reject(err)
			} else {
				resolve()
			}
		})
	})
}


module.exports = p_fs
