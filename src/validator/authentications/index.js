const InvariantError = require('../../exceptions/InvariantError');
const {
  PostAuthenticationsPayloadSchema,
  PutAuthenticationsPayloadSchema,
  DeleteAuthenticationsPayloadSchema,
} = require('./schema');

const AuthenticationValidator = {
  validatePostAuthentication: (payload) => {
    const validationResult = PostAuthenticationsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutAuthentication: (payload) => {
    const validationResult = PutAuthenticationsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteAuthentication: (payload) => {
    // eslint-disable-next-line prettier/prettier
    const validationResult = DeleteAuthenticationsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AuthenticationValidator;
