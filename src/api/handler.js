class MusicHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    postAlbumHandler(request, h) {
        this._validator.validateAlbumPayload(request.payload);
        const { name, year } = request.payload;
        const response = h.response({
            status: 'success',
            data: {
                album_id,
            },
        });
        response.code(201);
        return response;
    }

    getAlbumByIdHandler(request) {
        const { id } = request.params;
        return {
            status: 'success',
            data: {
                album,
            },
        };
    }

    putAlbumByIdHandler(request) {
        const { id } = request.params;
        return {
            status: 'success',
            message: 'Berhasil edit album',
        };
    }

    deleteAlbumByIdHandler(request) {
        const { id } = request.params;
        return {
            status: 'success',
            message: 'Berhasil menghapus album',
        }
    }

    postSongsHandler(request, h) {
        this._validator.validateSongPayload(request.payload);
        const { title, year, genre, performer, duration, albumId } = request.payload;
        const response = h.response({
            status: 'success',
            data: {
                songId,
            }
        });
        response.code(201);
        return response;
    }

    getSongsHandler() {
        return {
            status: 'success',
            data: {
                songs,
            }
        };
    }

    getSongByIdHandler(request) {
        const { id } = request.params;
        return {
            status: 'success',
            data: {
                song,
            },
        };
    }

    putSongByIdHandler(request) {
        this._validator.validateSongPayload(request.payload);
        const { id } = request.params;
        const { title, year, genre, performer, duration, albumId } = request.payload;
        return {
            status: 'success',
            message: 'Berhasil edit lagu'
        }
    }

    deleteSongByIdHandler() {
        const { id } = request.params;
        return {
            status: 'success',
            message: 'Berhasil hapus lagu',
        };
    }
}

module.exports = MusicHandler;