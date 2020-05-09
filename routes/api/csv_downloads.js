const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')
const { Department } = require('../../models/department')
const { Employee } = require('../../models/employee')
const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

router.get('/departments', async (req, res) => {
	const departments = await Department.find()
	res.writeHead(200, {
		'Content-Type': 'text/csv',
		'Content-Disposition': 'attachment; filename=*blabla*.csv'
	})
	res.end(dataToCSV(departments, ["id", "name", "date"]));
});

router.get('/employees', async (req, res) => {
	const employees = await Employee.find()
	res.writeHead(200, {
		'Content-Type': 'text/csv',
		'Content-Disposition': 'attachment; filename=*blabla*.csv'
	})
	res.end(dataToCSV(employees, ["id", "name", "email", "position", "salary", "location", "department"]));
});

function dataToCSV(data, headers) {
	var allData = [];
	allData.push(headers);

	data.forEach(function(object){
		var arr = [];
		headers.forEach(function(i){
			arr.push(object[i])
		})

		allData.push(arr)
	})

	var csvFile = "";

	allData.forEach(function(data, index){
		var dataString = data.join(",");
		csvFile += index < allData.length ? dataString + "\n" : dataString;
	})
	return csvFile;
}

module.exports = router;