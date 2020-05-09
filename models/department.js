const Joi = require('joi');
const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength:50
	}
})

function validateDepartment(department) {
	const schema = {
		name: Joi.string().min(3).required()
	}

	return Joi.validate(department, schema);
}

exports.Department = mongoose.model('Department', DepartmentSchema);;
exports.validate = validateDepartment