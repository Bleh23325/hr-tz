const db = require('../../Connect')
class jobTitleController{
    // создание должности
        async createJobTitle(req, res) {
            //при помощи дкструктуризации получаем название должности
            const { name } = req.body;
            console.log(name);
            try {
                const newJobTitle = await db.query(
                    'INSERT INTO job_title(name) VALUES ($1) RETURNING *', 
                    [name]
                );
                res.json(`Должность ${newJobTitle.rows[0].name} добавлена в базу данных`);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при добавлении должности', error });
            }
        }
        // просмотр должностей
        async getJobTitle(req, res) {
            try {
                const jobTitles = await db.query('SELECT * FROM job_title');
                res.json(jobTitles.rows);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении должностей', error });
            }
        }
    
        // возврат 1 должности по айди
        async getOneJobTitle(req, res) {
            const { id } = req.params;
            try {
                const jobTitle = await db.query('SELECT * FROM job_title WHERE id_job_title = $1', [id]);
                if (jobTitle.rows.length === 0) {
                    res.status(404).json({ message: 'Должность не найдена' });
                } else {
                    res.json(jobTitle.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении должности', error });
            }
        }
    
        // обновление должности
        async updateJobTitle(req, res) {
            const { id } = req.params;
            const { name } = req.body;
            try {
                const updatedJobTitle = await db.query(
                    'UPDATE job_title SET name = $1 WHERE id_job_title = $2 RETURNING *', 
                    [name, id]
                );
                if (updatedJobTitle.rows.length === 0) {
                    res.status(404).json({ message: 'Должность не найдена' });
                } else {
                    res.json(`Должность ${updatedJobTitle.rows[0].name} обновлена`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении должности', error });
            }
        }
    
        // удаление должности
        async deleteJobTitle(req, res) {
            const { id } = req.params;
            try {
                const deletedJobTitle = await db.query('DELETE FROM job_title WHERE id_job_title = $1 RETURNING *', [id]);
                if (deletedJobTitle.rows.length === 0) {
                    res.status(404).json({ message: 'Должность не найдена' });
                } else {
                    res.json(`Должность ${deletedJobTitle.rows[0].name} удалена`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при удалении должности', error });
            }
        }
    }
// экспортируем объект контроллера
module.exports = new jobTitleController