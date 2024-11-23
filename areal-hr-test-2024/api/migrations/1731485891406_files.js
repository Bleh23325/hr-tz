/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// тут будет код для изменения бд
module.exports =  {up: (pgm) => {
    // таблица с фото паспорта
    pgm.createTable('files', {
      id_files: {type: 'serial', primaryKey: true},
      name: {type: 'character(40)', notNull: false},
      path: {type: 'text', notNull: false},
      worker: {type: 'integer', notNull: false},
  });
  },
  /**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// тут код для отката изменения бд
down: (pgm) => {
    pgm.dropTable('files');
  }
};
