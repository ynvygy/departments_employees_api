const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')
const { Department, validate } = require('../../models/department')
const { Employee } = require('../../models/employee')
const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	const departments = await Department.find().sort('name');
	res.send(departments)
});

router.post('/', async (req, res) => {

	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message)

	const department = new Department({ name: req.body.name })
	await department.save();

	res.send(department)
});

router.put('/:id', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message)

	const department = await Department.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
		new: true
	});

	if (!department) return res.status(404).send('The department was not found');

	res.send(department)
})

router.get('/:id', async (req, res) => {
	const department = await Department.findById(req.params.id)
	if (!department) return res.status(404).send('The department was not found');
	res.send(department)
});

router.delete('/:id', [auth, admin], async (req, res) => {
	const department = await Department.findByIdAndRemove(req.params.id);
	if (!department) return res.status(404).send('The department was not found');

	res.send(department)
})

router.get('/:id/employees', async (req,res) => {
	const department = await Department.findById(req.params.id)
	const employees = await Employee.find({"department": department})
	res.send(employees)
})

module.exports = router;