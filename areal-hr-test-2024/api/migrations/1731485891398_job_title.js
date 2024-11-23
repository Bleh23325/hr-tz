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
    //таблица с паролями и логинами
    pgm.createTable('job_title', {
      id_job_title: { type: 'serial', primaryKey: true},  //serial - тип счётчика
      name: { type: 'character(40)', notNull: false },
  });
  },
  /**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// тут код для отката изменения бд
down: (pgm) => {
    pgm.dropTable('job_title');
  }
};
