// Input validation schemas and middleware
const Joi = require('joi');

// Validation schemas
const schemas = {
    // User registration validation schema
    registerSchema: Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .required()
            .messages({
                'string.min': 'Username must be at least 3 characters long',
                'string.max': 'Username cannot exceed 30 characters',
                'any.required': 'Username is required'
            }),
            
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required'
            }),
            
        password: Joi.string()
            .min(6)
            .required()
            .messages({
                'string.min': 'Password must be at least 6 characters long',
                'any.required': 'Password is required'
            })
    }),

    // Login validation schema
    loginSchema: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required'
            }),
            
        password: Joi.string()
            .required()
            .messages({
                'any.required': 'Password is required'
            })
    }),

    // Update user validation schema
    updateSchema: Joi.object({
        newUsername: Joi.string()
            .min(3)
            .max(30)
            .required()
            .messages({
                'string.min': 'New username must be at least 3 characters long',
                'string.max': 'New username cannot exceed 30 characters',
                'any.required': 'New username is required'
            })
    })
};

// Validation middleware
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
        
        next();
    };
};

module.exports = {
    validateRequest,
    schemas
};
