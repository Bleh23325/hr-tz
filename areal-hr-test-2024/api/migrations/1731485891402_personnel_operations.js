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
    // таблица персональных операций
    pgm.createTable('personel_operations', {
      id_personel_operations: {type: 'serial', primaryKey: true},
      worker: {type:'integer', notNull: false},
      hiring: {type:'integer', notNull: false},
      change_salary:{type:'integer', notNull: false},
      change_department: {type:'character(30)', notNull: false},
      is_dismissed: {type:'boolean', notNull: false},
  });
  },
  /**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// тут код для отката изменения бд
down: (pgm) => {
    pgm.dropTable('personel_operations');
  }
};
