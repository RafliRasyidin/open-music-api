/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
class PlaylistsHandler {
  constructor(playlistService, songsService, validator) {
    this._playlistService = playlistService;
    this._songsService = songsService;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
    this.postSongToPlaylistHandler = this.postSongToPlaylistHandler.bind(this);
    this.getSongsInPlaylistHandler = this.getSongsInPlaylistHandler.bind(this);
    this.deleteSongFromPlaylistHandler = this.deleteSongFromPlaylistHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePostPlaylistPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { name } = request.payload;
    const playlistId = await this._playlistService.postPlaylist(name, credentialId);
    
    const response = h.response({
        status: 'success',
        message: 'Playlist berhasil ditambahkan',
        data: {
            playlistId,
        },
    })
    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._playlistService.getPlaylists(credentialId);

    const response = h.response({
        status: 'success',
        data: {
            playlists,
        }
    })
    return response;
  }

  async deletePlaylistByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistService.verifyPlaylistOwner(id, credentialId);
    await this._playlistService.deletePlaylistById(id);

    const response = h.response({
        status: 'success',
        message: 'Playlist berhasil dihapus',
    })
    return response;
  }

  async postSongToPlaylistHandler(request, h) {
    this._validator.validatePostSongToPlaylistPayload(request.payload);
    
    const { id } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._songsService.getSongById(songId);
    await this._playlistService.verifyPlaylistAccess(id, credentialId);
    await this._playlistService.postSongToPlaylist(id, songId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan lagu ke playlist',
    })
    response.code(201);
    return response;
    
  }

  async getSongsInPlaylistHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistService.verifyPlaylistAccess(id, credentialId);
    const playlist = await this._playlistService.getPlaylistById(id);

    const response = h.response({
      status: 'success',
      data: {
        playlist,
      }
    })
    return response;
  }

  async deleteSongFromPlaylistHandler(request, h) {
    this._validator.validateDeleteSongFromPlaylistPayload(request.payload);
    const { songId } = request.payload;
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistService.verifyPlaylistAccess(id, credentialId);
    await this._playlistService.deleteSongFromPlaylist(id, songId);

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    })
    return response;
  }
}

module.exports = PlaylistsHandler;
