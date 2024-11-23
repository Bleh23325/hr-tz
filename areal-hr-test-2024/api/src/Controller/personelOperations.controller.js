const db = require('../../Connect')
class personelOperationsController{
    // создание персональной операции
        async createPersonelOperations(req, res) {
            const { worker,hiring,change_salary,change_department,is_dismissed } = req.body;
            console.log(worker,hiring,change_salary,change_department,is_dismissed);
            try {
                const newPersonelOperations = await db.query(
                    'INSERT INTO personel_operations(worker,hiring,change_salary,change_department,is_dismissed) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
                    [worker,hiring,change_salary,change_department,is_dismissed]
                );
                res.json(`Персональная операция ${newPersonelOperations.rows[0].name} добавла в базу данных`);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при добавлении персональной операции', error });
            }
        }
        // просмотр персональной операции
        async getPersonelOperations(req, res) {
            try {
                const personelOperations = await db.query('SELECT * FROM personel_operations');
                res.json(personelOperations.rows);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении персональной операции', error });
            }
        }
    
        // возврат 1 персональной операции по айди
        async getOnePersonelOperations(req, res) {
            const { id } = req.params;
            try {
                const personelOperation = await db.query('SELECT * FROM personel_operations WHERE id_personel_operations = $1', [id]);
                if (personelOperation.rows.length === 0) {
                    res.status(404).json({ message: 'Персональная операция не найдена' });
                } else {
                    res.json(personelOperation.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении персональной операции', error });
            }
        }
    
        // обновление персональной операции
        async updatePersonelOperations(req, res) {
            const { id } = req.params;
            const { worker,hiring,change_salary,change_department,is_dismissed } = req.body;
            try {
                const updatePersonelOperations = await db.query(
                    'UPDATE personel_operations SET worker = $1,hiring = $2,change_salary = $3,change_department = $4,is_dismissed = $5 WHERE id_personel_operations = $6 RETURNING *', 
                    [worker,hiring,change_salary,change_department,is_dismissed, id]
                );
                if (updatePersonelOperations.rows.length === 0) {
                    res.status(404).json({ message: 'Персональная опрпция не найдена' });
                } else {
                    res.json(`Персональная операция ${updatePersonelOperations.rows[0].name} обновлена`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении персональной операции', error });
            }
        }
    
        // удаление персональной операции
        async deletePersonelOperations(req, res) {
            const { id } = req.params;
            try {
                const deletePersonelOperations = await db.query('DELETE FROM personel_operations WHERE id_personel_operations = $1 RETURNING *', [id]);
                if (deletePersonelOperations.rows.length === 0) {
                    res.status(404).json({ message: 'Персональная операция не найдена' });
                } else {
                    res.json(`Персональная операция ${deletePersonelOperations.rows[0].name} удалена`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при удалении персональной операции', error });
            }
        }
    }
// экспортируем объект контроллера
module.exports = new personelOperationsController