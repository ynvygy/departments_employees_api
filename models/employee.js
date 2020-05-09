const Joi = require('joi');
const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
	name: { 
		type: String, 
		required: true, 
		minlength: 5, 
		maxlength: 255 
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
		unique: true
	},
	position: {
		type: String,
		require: true,
		minlength: 5,
		maxlength: 255
	},
	//customerId: Joi.objectId().required(),
	//username: { type: Number,
	//			required: function() { return this.name; }
	//		  },
	//category: {
	//	type: String,
	//	required: true,
	//	enum: ["close", "know"],
	//	lowercase: true,
	//	trime: true
	//},
	date: { 
		type: Date,
		default: Date.now 
	},
	salary: {
		type: Number,
		require: true,
		minlength: 0,
		maxlength: 100
	},
	location: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 255
	},
	department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }
});

function validateEmployee(employee) {
	const schema = {
		name: Joi.string().min(5).required(),
		email: Joi.string().min(5).required(),
		position: Joi.string().min(5).required(),
		date: Joi.date(),
		salary: Joi.number().required(),
		location: Joi.string().min(3).required(),
		department: Joi.string().required()
	}

	return Joi.validate(employee, schema);
}

exports.Employee = mongoose.model('Employee', EmployeeSchema);
exports.validate = validateEmployee