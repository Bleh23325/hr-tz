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
     //связь worker/fields
     pgm.addConstraint('files', 'fk_photos_passport', {
        foreignKeys: [{
            columns: 'worker',
            references: 'workers(id_worker)',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'  
        }]
    })
    // связь таблиц users/roots
    pgm.addConstraint('users', 'fk_keys_roots', {
        foreignKeys: [{
            columns: 'root', // Внешний ключь из таблицы users
            references: 'roots(id_roots)', //указание на то, чтобы внешний ключ ссылалася на таблицу roots и столбец id_roots
            onDelete: 'SET NULL', // действие при удалении данных из roots
            onUpdate: 'CASCADE'  // действие при изменении в roots
        }]
    });
    // связь address/workers
    pgm.addConstraint('address', 'fk_address_workers',{
        foreignKeys: [{
            columns: 'worker', // Внешний ключь из таблицы address
            references: 'workers(id_worker)', //указание на то, чтобы внешний ключ ссылалася на таблицу workers и столбец id_worker
            onDelete: 'SET NULL', // действие при удалении данных из workers
            onUpdate: 'CASCADE'  // действие при изменении в workers
        }]
    });
    // связь passport/workers
    pgm.addConstraint('passport', 'fk_passport_workers',{
        foreignKeys: [{
            columns: 'worker', // Внешний ключь из таблицы passport
            references: 'workers(id_worker)', //указание на то, чтобы внешний ключ ссылалася на таблицу workers и столбец id_worker
            onDelete: 'SET NULL', // действие при удалении данных из workers
            onUpdate: 'CASCADE'  // действие при изменении в workers
        }]
    });
    // связь personel_operations/worker
    pgm.addConstraint('personel_operations', 'fk_personel_operations_worker_workers',{
        foreignKeys: [{
            columns: 'worker', // Внешний ключь из таблицы personel_operations
            references: 'workers(id_worker)', //указание на то, чтобы внешний ключ ссылалася на таблицу workers и столбец id_worker
            onDelete: 'SET NULL', // действие при удалении данных из workers
            onUpdate: 'CASCADE'  // действие при изменении в workers
        }]
    });
    // связь personel_operations/hiring
    pgm.addConstraint('personel_operations', 'fk_personel_operations_hiring_workers',{
        foreignKeys: [{
            columns: 'hiring', // Внешний ключь из таблицы hiring
            references: 'hiring(id_hiring)', //указание на то, чтобы внешний ключ ссылалася на таблицу hiring и столбец id_hiring
            onDelete: 'SET NULL', // действие при удалении данных из workers
            onUpdate: 'CASCADE'  // действие при изменении в workers
        }]
    });
    // связь hiring/job_title
    pgm.addConstraint('hiring', 'fk_hiring_job_title_workers',{
        foreignKeys: [{
            columns: 'job_title', // Внешний ключь из таблицы hiring
            references: 'job_title(id_job_title)', //указание на то, чтобы внешний ключ ссылалася на таблицу job_title и столбец id_job_title
            onDelete: 'SET NULL', // действие при удалении данных из workers
            onUpdate: 'CASCADE'  // действие при изменении в workers
        }]
    });
    // связь hiring/department
    pgm.addConstraint('hiring', 'fk_hiring_department_workers',{
        foreignKeys: [{
            columns: 'department', // Внешний ключь из таблицы hiring
            references: 'department(id_department)', //указание на то, чтобы внешний ключ ссылалася на таблицу department и столбец id_department
            onDelete: 'SET NULL', // действие при удалении данных из workers
            onUpdate: 'CASCADE'  // действие при изменении в workers
        }]
    });
    // связь department/organization
    pgm.addConstraint('department', 'fk_organization_department',{
        foreignKeys: [{
            columns: 'organization', // Внешний ключь из таблицы hiring
            references: 'organization(id_organization)', //указание на то, чтобы внешний ключ ссылалася на таблицу organization и столбец id_organization
            onDelete: 'SET NULL', // действие при удалении данных из workers
            onUpdate: 'CASCADE'  // действие при изменении в workers
        }]
    });
    // связь histori_of_changes/users
    pgm.addConstraint('histori_of_changes', 'fk_histori_of_changes_users',{
        foreignKeys: [{
            columns: 'who_change', // Внешний ключь из таблицы hiring
            references: 'users(id_us)', //указание на то, чтобы внешний ключ ссылалася на таблицу organization и столбец id_organization
            onDelete: 'SET NULL', // действие при удалении данных из workers
            onUpdate: 'CASCADE'  // действие при изменении в workers
        }]
    });
  },

  /**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// тут код для отката изменения бд
down: (pgm) => {

  }
};
