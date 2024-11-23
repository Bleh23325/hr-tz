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
    // Таблица с историей изменений
    pgm.createTable('histori_of_changes', {
      id_histori_of_changes: {type: 'serial', primaryKey: true},
      date_and_time_of_operation: {type: 'date', primaryKey: true},
      who_change: {type:'integer', notNull: false},
      object_of_operation: {type:'integer', notNull: false},
      modified_fields: {type:'character(30)', notNull: false},
  });
  },

  /**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// тут код для отката изменения бд
down: (pgm) => {
    pgm.dropTable('histori_of_changes');
  }
};
