class MusicHandler {
    constructor(service) {
        this._service = service
    }

    postAlbumHandler(request, h) {
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