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
    pgm.createTable('album', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        name: {
            type: 'VARCHAR(1000)',
            notNull: true,
        },
        year: {
            type: 'VARCHAR(4)',
            notNull: true
        },
        createdAt: {
            type: 'TEXT',
            notNull: true
        },
        updatedAt: {
            type: 'TEXT',
            notNull: true
        },
    });

    pgm.createTable('song', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        title: {
            type: 'VARCHAR(1000)',
            notNull: true,
        },
        year: {
            type: 'VARCHAR(4)',
            notNull: true,
        },
        performer: {
            type: 'VARCHAR(1000)',
            notNull: true,
        },
        genre: {
            type: 'VARCHAR(1000)',
            notNull: true
        },
        duration: {
            type: 'INTEGER',
            notNull: false,
        },
        albumId: {
            type: 'VARCHAR(50)',
            notNull: false,
        },
        createdAt: {
            type: 'TEXT',
            notNull: true
        },
        updatedAt: {
            type: 'TEXT',
            notNull: true
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    
};
