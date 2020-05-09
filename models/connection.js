const Joi = require('joi');
const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
	rank: {
		type: String,
		required: true,
		minlength: 1,
		maxlength:5,
		enum: ['FAMILY', 'FRIEND', 'ACQUAINTANCE', 'OTHER']
	},
    from_employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        index: true
    },
    to_employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        index: true
    }
})

ConnectionSchema.index({ 'from_employee': 1, 'to_employee': 1 }, { unique: true });

function validateConnection(connection) {
	const schema = {
		from_employee: Joi.string().min(3).required(),
		to_employee: Joi.string().min(3).required(),
		rank: Joi.string().min(1).required(),
	}

	return Joi.validate(connection, schema);
}

exports.Connection = mongoose.model('Connection', ConnectionSchema);
exports.validate = validateConnection
