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
    pgm.createTable('users', {
      id_us: { type: 'serial', primaryKey: true},  //serial - тип счётчика
      user_name: { type: 'character(30)', notNull: false },
      password: { type: 'character(30)', notNull: false },
      root: { type: 'integer', notNull: false },
      worker: { type: 'integer', notNull: false },
  });
  },

  /**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// тут код для отката изменения бд
down: (pgm) => {
    pgm.dropTable('users');
  }
};
