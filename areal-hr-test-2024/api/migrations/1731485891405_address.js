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
     // таблица с адресами
     pgm.createTable('address',{
      id_address: {type: 'serial', primaryKey: true},
      region: {type:'character(30)', notNull: false},
      settelment: {type:'character(30)', notNull: false},
      street: {type:'character(30)', notNull: false},
      house: {type:'integer', notNull: false},
      building: {type:'character(30)', notNull: false},
      apartment: {type:'character(30)', notNull: false},
      worker: {type:'integer', notNull: false},
  });
  },
  /**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// тут код для отката изменения бд
down: (pgm) => {
    pgm.dropTable('address');
  }
};
