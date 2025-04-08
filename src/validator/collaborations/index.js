const InvariantError = require('../../exceptions/InvariantError');
const {
  PostCollaborationsSchema,
  DeleteCollaborationsSchema,
} = require('./schema');

const CollaborationsValidator = {
  validatePostCollaborationsPayload: (payload) => {
    const validationResult = PostCollaborationsSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteCollaborationsPayload: (payload) => {
    const validationResult = DeleteCollaborationsSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CollaborationsValidator;
