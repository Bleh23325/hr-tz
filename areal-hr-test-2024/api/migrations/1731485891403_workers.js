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
    // таблица с работниками
    pgm.createTable('workers',{
      id_worker:{type: 'serial', primaryKey: true},
      lastname:{type:'character(30)', notNull: false},
      name:{type:'character(30)', notNull: false},
      patronumic:{type:'character(30)', notNull: false},
      phone:{type:'character(30)', notNull: false},
  });
  },
  /**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// тут код для отката изменения бд
down: (pgm) => {
    pgm.dropTable('workers');
  }
};
