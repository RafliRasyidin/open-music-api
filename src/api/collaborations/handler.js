/* eslint-disable no-underscore-dangle */
class CollaborationsHandler {
  constructor(collaborationsService, playlistsService, validator) {
    this._collaborationsService = collaborationsService;
    this._playlistsService = playlistsService;
    this._validator = validator;
  }

  async postCollaborationHandler(request, h) {
    this._validator.validatePostCollaborationsPayload(request.payload);

    const { playlistId, userId } = request.payload;
    const { id: credentialId } = request.auth.request;

    await this._playlistsService.verifyAccess(playlistId, credentialId);
    const collaborationId = await this._collaborationsService.addCollaborations(
      playlistId,
      userId
    );
    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan kolaborator',
      data: {
        collaborationId,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCollaborationHandler(request, h) {
    this._validator.validateDeleteCollaborationsPayload(request.payload);

    const { playlistId, userId } = request.payload;
    const { id: credentialId } = request.auth.request;

    await this._playlistsService.verifyAccess(playlistId, credentialId);
    await this._collaborationsService.deleteCollaborations(playlistId, userId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus user dari kolaborator',
    });
    return response;
  }
}
