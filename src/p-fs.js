var fs = require('fs')

var p_fs = {}

var ErrorStringArr = {
	FileNameNotString: 'The file name must be a string!!!',
	DataNotString: 'The data must be a string!!!'
}

var syncApi = [
	'renameSync',
	'ftruncateSync',
	'truncateSync',
	'readFileSync',
	'writeFileSync'
]

var asyncApi = [
	'rename',
	'truncate',
	'ftruncate',
	'chown',
	'fchown',
	'lchown',
	'chmod',
	'fchmod',
	'lchmod',
	'stat',
	'lstat',
	'fstat',
	'link',
	'symlink',
	'realpath',
	'unlink',
	'rmdir',
	'mkdir',
	'readdir',
	'close',
	'open',
	'utimes',
	'futimes',
	'fsync',
	'appendFile',
	//@TODO: unknown
	'watchFile',
	'unwatchFile',
	
	
	'exists',
	
	
	'access',
	'readFile',
	'writeFile'
]

// fecth the sync api
syncApi.forEach(function (functionName) {
	p_fs[functionName] = fs[functionName]
})


// fecth the async api
asyncApi.forEach(function (funcName) {
	p_fs[funcName] = function () {
		var argc = fs[funcName].length
		var argv = Array.from(arguments).slice(0, argc);		
		return new Promise(function (resolve, reject) {
			argv[argc] = function (err, data) {
				if (err) {
					reject(err)
					return 
				}
				resolve(data)
			}
			
			fs[funcName].apply(null, argv)
		})
	}
})


module.exports = p_fs
