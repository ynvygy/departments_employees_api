const { Employee, validate } = require('../../models/employee');
const { Connection } = require('../../models/connection')
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
	const employees = await Employee.find().sort('name');
	res.send(employees);
})

router.post('/', async(req, res) => {
	try {
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const employee = new Employee({
			name: req.body.name,
			email: req.body.email,
			position: req.body.position,
			department: req.body.department,
			salary: req.body.salary,
			location: req.body.location
		})
		await employee.save();

		res.send(employee);
	} catch (e) {
		console.log(e)
	}
	
})

router.put('/:id', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const employee = await Employee.findByIdAndUpdate(req.params.id, {
		name: req.body.name
	}, { new: true });

	if (!employee) return res.status(404).send("The employee was not found");

	res.send(employee);
})

router.delete('/:id', async (req, res) => {
	const employee = await Employee.findByIdAndRemove(req.params.id);

	if (!employee) return res.status(404).send("The employee was not found");

	res.send(employee);
});

router.get('/:id', async (req, res) => {
	const employee = await Employee.findById(req.params.id);

	if (!employee) return res.status(404).send("The employee was not found");

	res.send(employee);
})

router.get('/:id/connections', async (req,res) => {
	const employee = await Employee.findById(req.params.id)
	const connections = await Connection.find({"from_employee": employee})
	res.send(connections)
})

module.exports = router;