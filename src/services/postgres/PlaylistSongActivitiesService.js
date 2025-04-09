/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');

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
}

module.exports = PlaylistSongActivities;
