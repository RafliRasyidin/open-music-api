const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapSongDbToSongs, mapSongDBToModel } = require("../../utils");

class MusicService {
    constructor() {
        this._pool = new Pool();
    }

    async addAlbum({ name, year }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO album VALUES($1, $2, $3, $4, $5) RETURNING id',
            values: [id, name, year, createdAt, updatedAt],
        }

        const result = await this._pool.query(query);
        if (!result.rows[0].id) {
            throw new InvariantError('Album gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getAlbumById(id) {
        const query = {
            text: 'SELECT * FROM album WHERE id = $1',
            values: [id],
        }
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError("Album tidak ditemukan");
        }
        const album = result.rows[0];

        const queryAlbum = {
            text: 'SELECT id, title, performer FROM song WHERE album_id = $1',
            values: [id]
        }
        const songsResult = await this._pool.query(queryAlbum);
        const songs = songsResult.rows;

        const finalResult = {
            id: album.id,
            name: album.name,
            year: album.year,
            songs: songs
        };
        return finalResult;
    }

    async editAlbumById(id, { name, year }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE album SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id',
            values: [name, year, updatedAt, id],
        };
        const result = await this._pool.query(query);
        
        if (!result.rows.length) {
            throw new NotFoundError('Gagal edit album. Id Tidak Ditemukan');
        }
    }

    async deleteAlbumById(id) {
        const query = {
            text: 'DELETE FROM album WHERE id = $1 RETURNING id',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Gagal delete album. Id Tidak Ditemukan');
        }
    }

    async addSong({title, year, genre, performer, duration, albumId}) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO song VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
            values: [id, title, year, performer, genre, duration, albumId, createdAt, updatedAt]
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Lagu gagal ditambahkan')
        }
        return result.rows[0].id;
    }

    async getSongs({title, performer}) {
        const query = {
            text: 'SELECT * FROM song WHERE title LIKE $1 OR performer LIKE $2',
            values: [`%${title}%`, `%${performer}%`]
          };
        const result = await this._pool.query(query);
        return result.rows.map(mapSongDbToSongs);
    }

    async getSongById(id) {
        const query = {
            text: 'SELECT * FROM song WHERE id = $1',
            values: [id]
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Lagu tidak ditemukan')
        }
        return result.rows.map(mapSongDBToModel)[0];
    }

    async editSongById(id, {title, year, genre, performer, duration, albumId}) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE song SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6, updated_at = $7 WHERE id = $8 RETURNING id',
            values: [title, year, genre, performer, duration, albumId, updatedAt, id]
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Gagal edit lagu. Id Tidak Ditemukan');
        }
    }

    async deleteSongById(id) {
        const query = {
            text: 'DELETE FROM song WHERE id = $1 RETURNING id',
            values: [id]
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Gagal delete lagu. Id Tidak Ditemukan');
        }
    }
}

module.exports = MusicService;