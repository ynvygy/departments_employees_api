const auth = require('../../middleware/auth');
const { Connection, validate } = require('../../models/connection');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get('/', auth, async (req, res) => {
	const connections = await Connection.find()
	res.send(connections)
})

router.post('/', auth, async (req, res) => {

	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message)

	const connection = new Connection({ from_employee: req.body.from_employee, to_employee: req.body.to_employee, rank: req.body.rank })
	await connection.save();

	res.send(connection)
});

module.exports = router;