/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapSongDbToSongs, mapSongDBToModel } = require('../../utils');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({ title, year, genre, performer, duration, albumId }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO song VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [
        id,
        title,
        year,
        performer,
        genre,
        duration,
        albumId,
        createdAt,
        updatedAt,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getSongs({ title, performer }) {
    const query = {
      text: 'SELECT * FROM song WHERE title LIKE $1 OR performer LIKE $2',
      values: [`%${title}%`, `%${performer}%`],
    };
    const result = await this._pool.query(query);
    return result.rows.map(mapSongDbToSongs);
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM song WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
    return result.rows.map(mapSongDBToModel)[0];
  }

  async getSongsByAlbumId(albumId) {
    const query = {
      text: 'SELECT id, title, performer FROM song WHERE album_id = $1',
      values: [albumId],
    };
    const result = await this._pool.query(query);
    return result.rows.map(mapSongDbToSongs);
  }

  async editSongById(id, { title, year, genre, performer, duration, albumId }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE song SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6, updated_at = $7 WHERE id = $8 RETURNING id',
      values: [title, year, genre, performer, duration, albumId, updatedAt, id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal edit lagu. Id Tidak Ditemukan');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM song WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal delete lagu. Id Tidak Ditemukan');
    }
  }
}

module.exports = SongsService;
