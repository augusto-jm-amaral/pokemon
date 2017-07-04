'use strict'

module.exports = (msg) => {
	var newErr = new Error(msg)
	return e => { 
		newErr.originalError = e
		throw newErr
	}
}