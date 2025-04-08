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
  pgm.addConstraint(
    'collaborations',
    'fk_collaborations.playlist_id_playlists.id',
    {
      foreignKeys: {
        columns: 'playlist_id',
        references: 'playlists(id)',
        onDelete: 'cascade',
      },
    }
  );

  pgm.addConstraint('collaborations', 'fk_collaborations.user_id_users.id', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'cascade',
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropConstraint(
    'collaborations',
    'fk_collaborations.playlist_id_playlists.id'
  );

  pgm.dropConstraint('collaborations', 'fk_collaborations.user_id_users.id');
};
