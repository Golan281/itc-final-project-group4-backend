//ajv validation schema:
const authRegisterSchema = {
    type: 'object',
    properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        repassword: {
            type: 'string',
        }
    },
    required: [
        'firstName', 'lastName',
        'email', 'password', 'repassword',
    ]
}

module.exports = authRegisterSchema;