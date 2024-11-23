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
    // таблица с данными паспорта
    pgm.createTable('passport',{
      id_passport: {type: 'serial', primaryKey: true},
      passport_series: {type:'character(30)', notNull: false},
      passport_number: {type:'character(30)', notNull: false},
      date_of_issue: {type:'date', notNull: false},
      department_code:{type:'character(7)', notNull: false},
      who_issue: {type:'character(60)', notNull: false},
      worker:{type:'integer', notNull: false},
  });
  },
  /**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// тут код для отката изменения бд
down: (pgm) => {
    pgm.dropTable('passport');
  }
};
