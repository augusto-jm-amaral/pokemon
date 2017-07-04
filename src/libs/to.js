'use strict'
/*
 to.js
 How to write async await without try-catch blocks in Javascript
 http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
 */
module.exports = (promise) => {  

	return promise.then(data => {  
		return [null, data];
	})
	.catch(err => [err]);
}