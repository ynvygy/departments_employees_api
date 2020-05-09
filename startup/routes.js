const express = require('express')
const home = require("../routes/home")
const departments = require("../routes/api/departments")
const employees = require("../routes/api/employees")
const connections = require("../routes/api/connections")
const csv_downloads = require("../routes/api/csv_downloads")
const users = require("../routes/api/users")
const auth = require('../routes/auth')
const error = require('../middleware/error')

module.exports = function(app) {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }))
	app.use(express.static('public'))
	app.use('/api/departments', departments);
	app.use('/api/employees', employees);
	app.use('/api/connections', connections);
	app.use('/api/csv_downloads', csv_downloads);
	app.use('/api/users', users);
	app.use('/api/auth', auth);
	app.use('/', home);

	app.use(error);
}