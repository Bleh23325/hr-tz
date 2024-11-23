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
    // таблица с наймом
    pgm.createTable('hiring', {
      id_hiring: {type: 'serial', primaryKey: true},
      department: {type: 'integer', notNull: false},
      job_title: {type: 'integer', notNull: false},
      salary: {type: 'integer', notNull: false},
  });
  },
  /**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// тут код для отката изменения бд
down: (pgm) => {
    pgm.dropTable('hiring');
  }
};
