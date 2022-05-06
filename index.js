const express = require('express')
const app = express()
let { getId, displayTime, displayPhonenumber, resizePhoto } = require('./tools')

app.listen(1000, (err) => {
	if (!err) {
		console.log("listened success")

		console.log(getId())
	} else {
		console.error("error has occurred")
	}
})
