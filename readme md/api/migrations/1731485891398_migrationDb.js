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

// таблицы

    //таблица с паролями и логинами
    pgm.createTable('keys', {
        id_us: { type: 'serial', primaryKey: true},  //serial - тип счётчика
        user_name: { type: 'character(30)', notNull: false },
        password: { type: 'character(30)', notNull: false },
        root: { type: 'integer', notNull: false },
        worker: { type: 'integer', notNull: false },
    });
    // таблица с правами доступа
    pgm.createTable('roots', {
        id_roots: { type: 'serial', primaryKey: true},  //serial - тип счётчика
        name: { type: 'character(30)', notNull: false },
    });
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
    // таблица с данными паспорта
    pgm.createTable('passport',{
        id_passport: {type: 'serial', primaryKey: true},
        passport_series: {type:'character(30)', notNull: false},
        passport_number: {type:'character(30)', notNull: false},
        date_of_issue: {type:'date', notNull: false},
        department_code:{type:'integer', notNull: false},
        who_issue: {type:'character(50)', notNull: false},
        worker:{type:'integer', notNull: false},
    });
    // таблица с работниками
    pgm.createTable('workers',{
        id_worker:{type: 'serial', primaryKey: true},
        lastname:{type:'character(30)', notNull: false},
        name:{type:'character(30)', notNull: false},
        patronumic:{type:'character(30)', notNull: false},
        phone:{type:'character(15)', notNull: false},
    });
    // таблица с организациями
    pgm.createTable('organization', {
        id_organization: {type: 'serial', primaryKey: true},
        name: {type:'character(30)', notNull: false},
        comments: {type:'text', notNull: false},
    });
    //таблица с должностями
    pgm.createTable('job_title',{
        id_job_title:{type: 'serial', primaryKey: true},
        name: {type:'character(30)', notNull: false},
    });
    // таблица с отделами
    pgm.createTable('department', {
        id_department:{type: 'serial', primaryKey: true},
        organization: {type:'integer', notNull: false},
        name: {type:'character(30)', notNull: false},
        comments: {type:'text', notNull: false},
    });
    // таблица с наймом
    pgm.createTable('hiring', {
        id_hiring: {type: 'serial', primaryKey: true},
        department: {type: 'integer', notNull: false},
        job_title: {type: 'integer', notNull: false},
        salary: {type: 'integer', notNull: false},
    });
    
    // таблица персональных операций
    pgm.createTable('personel_operations', {
        id_personel_operations: {type: 'serial', primaryKey: true},
        worker: {type:'integer', notNull: false},
        hiring: {type:'integer', notNull: false},
        change_salary:{type:'integer', notNull: false},
        change_department: {type:'character(30)', notNull: false},
        is_dismissed: {type:'boolean', notNull: false},
    });
    // Таблица с историей изменений
    pgm.createTable('histori_of_changes', {
        id_histori_of_changes: {type: 'serial', primaryKey: true},
        date_and_time_of_operation: {type: 'date', primaryKey: true},
        who_change: {type:'integer', notNull: false},
        change_organization: {type:'character(30)', notNull: false},
        change_job_title: {type:'character(30)', notNull: false},
        change_department: {type:'character(30)', notNull: false},
        change_worker: {type:'character(30)', notNull: false},
        change_personel_operation: {type:'character(30)', notNull: false},
    });
    pgm.createTable('photos', {
        id_photo: {type: 'serial', primaryKey: true},
        photo: {type:'bytea', notNull: false},
        passport: {type:'integer', notNull: false},
    })

// Связи
    //связь поспорта/фото пасспорта
    pgm.addConstraint('photos', 'fk_photos_passport', {
        foreignKeys: [{
            columns: 'passport',
            references: 'passport(id_passport)',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'  
        }]
    })
    // связь таблиц keys/roots
    pgm.addConstraint('keys', 'fk_keys_roots', {
        foreignKeys: [{
            columns: 'root', // Внешний ключь из таблицы keys
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
    // связь keys/worker
    pgm.addConstraint('keys', 'fk_keys_workers',{
        foreignKeys: [{
            columns: 'worker', // Внешний ключь из таблицы keys
            references: 'workers(id_worker)', //указание на то, чтобы внешний ключ ссылалася на таблицу workers и столбец id_worker
            onDelete: 'SET NULL', // действие при удалении данных из workers
            onUpdate: 'CASCADE'  // действие при изменении в workers
        }]
    });
    // связь histori_of_changes/worker
    pgm.addConstraint('histori_of_changes', 'fk_histori_of_changes_workers',{
        foreignKeys: [{
            columns: 'who_change', // Внешний ключь из таблицы histori_of_changes
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
},


/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
// тут код для отката изменения бд
down: (pgm) => {
    //дроп связей (пусть будет. Если прям не понадобится всегда можно удалить)
    // pgm.dropConstraint('keys', 'fk_keys_roots');
    // pgm.dropConstraint('address', 'fk_address_workers');
    // pgm.dropConstraint('passsport', 'fk_passport_workers');
    // pgm.dropConstraint('keys/worker', 'fk_keys/worker_workers');
    // pgm.dropConstraint('histori_of_changes', 'fk_histori_of_changes_workers');
    // pgm.dropConstraint('personel_operations/worker', 'fk_personel_operations/worker_workers');
    // pgm.dropConstraint('personel_operations/hiring', 'fk_personel_operations/hiring_workers');
    // pgm.dropConstraint('hiring/job_title', 'fk_hiring/job_title_workers');
    // pgm.dropConstraint('hiring/department', 'fk_hiring/department_workers');
    // pgm.dropConstraint('organization', 'fk_organization_workers');
    // дроп таблиц
    pgm.dropTable('keys');
    pgm.dropTable('roots');
    pgm.dropTable('address');
    pgm.dropTable('workers');
    pgm.dropTable('passport');
    pgm.dropTable('organization');
    pgm.dropTable('job_title');
    pgm.dropTable('department');
    pgm.dropTable('hiring');
    pgm.dropTable('personel_operations');
    pgm.dropTable('histori_of_changes');
    pgm.dropTable('photos');
}
}