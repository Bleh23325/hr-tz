const db = require('../../Connect')
class hiringController{
    // создание найма
        async createHiring(req, res) {
            const { department, job_title, salary } = req.body;
            console.log(department, job_title, salary);
            try {
                const newhiring = await db.query(
                    'INSERT INTO hiring(department, job_title, salary) VALUES ($1, $2, $3) RETURNING *', 
                    [department, job_title, salary]
                );
                res.json(`"Найм" ${newhiring.rows[0].name} добавлен в базу данных`);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при добавлении "найма"', error });
            }
        }
        // просмотр найма
        async getHiring(req, res) {
            try {
                const hirings = await db.query('SELECT * FROM hiring');
                res.json(hirings.rows);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении "найма"', error });
            }
        }
    
        // возврат 1 найма по айди
        async getOneHiring(req, res) {
            const { id } = req.params;
            try {
                const hiring = await db.query('SELECT * FROM hiring WHERE id_hiring = $1', [id]);
                if (hiring.rows.length === 0) {
                    res.status(404).json({ message: '"Найм" не найден' });
                } else {
                    res.json(hiring.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении "найма"', error });
            }
        }
    
        // обновление найма
        async updateHiring(req, res) {
            const { id } = req.params;
            const { department, job_title, salary } = req.body;
            try {
                const updatedHiring = await db.query(
                    'UPDATE hiring SET department = $1, job_title = $2, salary = $3 WHERE id_hiring = $4 RETURNING *', 
                    [department, job_title, salary, id]
                );
                if (updatedHiring.rows.length === 0) {
                    res.status(404).json({ message: '"Найм" не найден' });
                } else {
                    res.json(`"Найм" ${updatedHiring.rows[0].name} обновлён`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении "найма"', error });
            }
        }
    
        // удаление найма
        async deleteHiring(req, res) {
            const { id } = req.params;
            try {
                const deletedHiring = await db.query('DELETE FROM hiring WHERE id_hiring = $1 RETURNING *', [id]);
                if (deletedHiring.rows.length === 0) {
                    res.status(404).json({ message: '"Найм" не найден' });
                } else {
                    res.json(`"Найм" ${deletedHiring.rows[0].name} удалён`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при удалении "найма"', error });
            }
        }
    }
// экспортируем объект контроллера
module.exports = new hiringController