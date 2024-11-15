const db = require('../../Connect')
class workerController{
    // создание работника
        async createWorker(req, res) {
            const { lastname, name, patronumic, phone } = req.body;
            console.log(lastname, name, patronumic, phone);
            try {
                const newWorker = await db.query(
                    'INSERT INTO workers(lastname, name, patronumic, phone) VALUES ($1, $2, $3, $4) RETURNING *', 
                    [lastname, name, patronumic, phone]
                );
                res.json(`Работник ${newWorker.rows[0].name} добавлен в базу данных`);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при добавлении работника', error });
            }
        }
        // просмотр работника
        async getWorker(req, res) {
            try {
                const workers = await db.query('SELECT * FROM workers');
                res.json(workers.rows);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении работника', error });
            }
        }
    
        // возврат 1 работника по айди
        async getOneWorker(req, res) {
            const { id } = req.params;
            try {
                const worker = await db.query('SELECT * FROM workers WHERE id_worker = $1', [id]);
                if (worker.rows.length === 0) {
                    res.status(404).json({ message: 'Работник не найден' });
                } else {
                    res.json(worker.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении работника', error });
            }
        }
    
        // обновление работника
        async updateWorker(req, res) {
            const { id } = req.params;
            const { lastname, name, patronumic, phone } = req.body;
            try {
                const updateWorker = await db.query(
                    'UPDATE workers SET lastname = $1, name = $2, patronumic = $3, phone = $4  WHERE id_worker = $5 RETURNING *', 
                    [lastname, name, patronumic, phone, id ]
                );
                if (updateWorker.rows.length === 0) {
                    res.status(404).json({ message: 'Работник не найден' });
                } else {
                    res.json(`Работник ${updateWorker.rows[0].name} обновлён`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении работника', error });
            }
        }
    
        // удаление работника
        async deleteWorker(req, res) {
            const { id } = req.params;
            try {
                const deleteWorker = await db.query('DELETE FROM workers WHERE id_worker = $1 RETURNING *', [id]);
                if (deleteWorker.rows.length === 0) {
                    res.status(404).json({ message: 'Работник не найден' });
                } else {
                    res.json(`"Найм" ${deleteWorker.rows[0].name} удалён`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при удалении работника', error });
            }
        }
    }
// экспортируем объект контроллера
module.exports = new workerController