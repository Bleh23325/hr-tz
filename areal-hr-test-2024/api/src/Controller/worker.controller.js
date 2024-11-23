const db = require('../../Connect');
const { workerValidation } = require('../validations/worker.validation');

class workerController {
    // создание работника
    async createWorker(req, res) {
        const { lastname, name, patronumic, phone } = req.body;

        // Валидация данных
        const validationResult = workerValidation({ phone });

        // Проверка наличия ошибки в валидации
        if (validationResult && validationResult.error) {
            return res.status(400).json({
                message: 'Ошибка валидации',
                error: validationResult.error.details.map((detail) => detail.message).join(', '),
            });
        }

        try {
            const newWorker = await db.query(
                'INSERT INTO workers(lastname, name, patronumic, phone) VALUES ($1, $2, $3, $4) RETURNING *', 
                [lastname, name, patronumic, phone]
            );
            res.json({ message: `Работник ${newWorker.rows[0].name} добавлен в базу данных`, worker: newWorker.rows[0] });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при добавлении работника', error: error.message });
        }
    }

    // просмотр всех работников
    async getWorker(req, res) {
        try {
            const workers = await db.query('SELECT * FROM workers');
            res.json(workers.rows);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении работников', error: error.message });
        }
    }

    // возврат одного работника по ID
    async getOneWorker(req, res) {
        const { id } = req.params;
        try {
            const worker = await db.query('SELECT * FROM workers WHERE id_worker = $1', [id]);
            if (worker.rows.length === 0) {
                return res.status(404).json({ message: 'Работник не найден' });
            }
            res.json(worker.rows[0]);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении работника', error: error.message });
        }
    }

    // обновление работника
    async updateWorker(req, res) {
        const { id } = req.params;
        const { lastname, name, patronumic, phone } = req.body;

        // Валидация данных
        const validationResult = workerValidation({ phone });

        // Проверка наличия ошибки в валидации
        if (validationResult && validationResult.error) {
            return res.status(400).json({
                message: 'Ошибка валидации',
                error: validationResult.error.details.map((detail) => detail.message).join(', '),
            });
        }

        try {
            const updateWorker = await db.query(
                'UPDATE workers SET lastname = $1, name = $2, patronumic = $3, phone = $4 WHERE id_worker = $5 RETURNING *', 
                [lastname, name, patronumic, phone, id]
            );
            if (updateWorker.rows.length === 0) {
                return res.status(404).json({ message: 'Работник не найден' });
            }
            res.json({ message: `Работник ${updateWorker.rows[0].name} обновлен`, worker: updateWorker.rows[0] });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при обновлении работника', error: error.message });
        }
    }

    // удаление работника
    async deleteWorker(req, res) {
        const { id } = req.params;
        try {
            const deleteWorker = await db.query('DELETE FROM workers WHERE id_worker = $1 RETURNING *', [id]);
            if (deleteWorker.rows.length === 0) {
                return res.status(404).json({ message: 'Работник не найден' });
            }
            res.json({ message: `Работник с ID ${id} удален`, worker: deleteWorker.rows[0] });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при удалении работника', error: error.message });
        }
    }
}

module.exports = new workerController();
