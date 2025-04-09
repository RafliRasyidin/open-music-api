/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistSongActivities {
  constructor() {
    this._pool = new Pool();
  }

  async addActivity(playlistId, songId, userId, action) {
    const query = {
      text: 'INSERT INTO playlist_song_activities (playlist_id, song_id, user_id, action) VALUES($1, $2, $3, $4) RETURNING id',
      values: [playlistId, songId, userId, action],
    };
    await this._pool.query(query);
  }

  async getActivities() {
    const query = {
      text: `SELECT u.username, s.title, psa.action, TO_CHAR((psa.time AT TIME ZONE 'UTC')::timestamp, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') AS time FROM playlist_song_activities psa
            LEFT JOIN song s ON s.id = psa.song_id
            LEFT JOIN users u ON u.id = psa.user_id
            GROUP BY u.username, s.title, psa.action, psa.time
            ORDER BY psa.time ASC`,
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Belum ada aktivitas');
    }
    return result.rows;
  }
}

module.exports = PlaylistSongActivities;
