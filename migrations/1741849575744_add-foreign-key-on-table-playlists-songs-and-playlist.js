/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.addConstraint('playlists', 'fk_playlists.owner', {
    foreignKeys: {
      columns: 'owner',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('playlists_songs', 'fk_playlists_songs.playlist_id', {
    foreignKeys: {
      columns: 'playlist_id',
      references: 'playlists(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('playlists_songs', 'fk_playlists_songs.song_id', {
    foreignKeys: {
      columns: 'song_id',
      references: 'song(id)',
      onDelete: 'CASCADE',
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropConstraint('playlists', 'fk_playlists.owner');
  pgm.dropConstraint('playlists_songs', 'fk_playlists_songs.playlist_id');
  pgm.dropConstraint('playlists_songs', 'fk_playlists_songs.song_id');
};
