import validate from '../utils/schema/validator'


const validateUserData = (data: unknown) => {
  try {
    const schema = {
      type: 'object',
      properties: {
        full_name: {
          type: 'string',
          maxLength: 255,
          minLength: 5
        },
        email: {
          type: 'string',
          maxLength: 30,
          minLength: 5
        },
        password: {
          type: 'string',
          maxLength: 4,
          minLength: 4
        },
        birthdate: {
          type: 'string',
        }
      },
      required: [
        'full_name',
        'email',
        'password',
        'birthdate'
      ],
      additionalProperties: false
    }
    validate(schema, data)
  } catch (error) {
    return error
  }
}

export default validateUserData
