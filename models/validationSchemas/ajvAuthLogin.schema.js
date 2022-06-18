//ajv validation schema:
const authLoginSchema = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string' }
    },
    required: [
        'email', 'password'
    ]
}


module.exports = authLoginSchema;