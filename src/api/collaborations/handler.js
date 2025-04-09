/* eslint-disable no-underscore-dangle */
class CollaborationsHandler {
  constructor(
    collaborationsService,
    playlistsService,
    usersService,
    validator
  ) {
    this._collaborationsService = collaborationsService;
    this._playlistsService = playlistsService;
    this._usersService = usersService;
    this._validator = validator;

    this.postCollaborationHandler = this.postCollaborationHandler.bind(this);
    this.deleteCollaborationHandler =
      this.deleteCollaborationHandler.bind(this);
  }

  async postCollaborationHandler(request, h) {
    this._validator.validatePostCollaborationsPayload(request.payload);

    const { playlistId, userId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._usersService.verifyUser(userId);
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
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._usersService.verifyUser(userId);
    await this._collaborationsService.deleteCollaborations(playlistId, userId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus user dari kolaborator',
    });
    return response;
  }
}

module.exports = CollaborationsHandler;
