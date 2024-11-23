const db = require('../../Connect')
class historiOfChangesController{
    // создание прав доступа
    async createHistoriOfChanges(req, res) {
        const { date_and_time_of_operation,who_change,object_of_change,modified_fields } = req.body;
        try {
            const newHistoriOfChanges = await db.query(
                'INSERT INTO histori_of_changes(date_and_time_of_operation,who_change,object_of_change,modified_fields) VALUES ($1,$2,$3,$4) RETURNING *', 
                [date_and_time_of_operation,who_change,object_of_change,modified_fields]
            );
            res.json(`История изменений ${newHistoriOfChanges.rows[0].name} добавлена в базу данных`);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при добавлении истории изменений', error });
        }
    }
    
        // просмотр прав доступа
        async getHistoriOfChanges(req, res) {
            try {
                const historsiOfChanges = await db.query('SELECT * FROM histori_of_changes');
                res.json(historsiOfChanges.rows);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении истории доступа', error });
            }
        }
    
        // возврат 1 прав доступа по айди
        async getOneHistoriOfChanges(req, res) {
            const { id } = req.params;
            try {
                const HistoriOfChanges = await db.query('SELECT * FROM histori_of_changes WHERE id_histori_of_changes = $1', [id]);
                if (HistoriOfChanges.rows.length === 0) {
                    res.status(404).json({ message: 'Стория изменений не найденф' });
                } else {
                    res.json(HistoriOfChanges.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении истории изменений', error });
            }
        }
    
        // обновление прав доступа
        async updateHistoriOfChanges(req, res) {
            const { id } = req.params;
            const { date_and_time_of_operation,who_change,object_of_change,modified_fields } = req.body;
            try {
                const updateHistoriOfChanges = await db.query(
                    'UPDATE histori_of_changes SET date_and_time_of_operation =$1,who_change =$2,object_of_change =$3,modified_fields =$4 WHERE id_histori_of_changes = $5 RETURNING *', 
                    [date_and_time_of_operation,who_change,object_of_change,modified_fields, id]
                );
                if (updateHistoriOfChanges.rows.length === 0) {
                    res.status(404).json({ message: 'История изменений не найдена' });
                } else {
                    res.json(`История изменений ${updateHistoriOfChanges.rows[0].name} обновлена`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении истории должности', error });
            }
        }
    
        // удаление прав доступа
        async deleteHistoriOfChanges(req, res) {
            const { id } = req.params;
            try {
                const deleteHistoriOfChanges = await db.query('DELETE FROM histori_of_changes WHERE id_histori_of_changes = $1 RETURNING *', [id]);
                if (deleteHistoriOfChanges.rows.length === 0) {
                    res.status(404).json({ message: 'История изменений не найденф' });
                } else {
                    res.json(`История изменений ${deleteHistoriOfChanges.rows[0].name} удалена`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при удалении истории изменений', error });
            }
        }
    }
// экспортируем объект контроллера
module.exports = new historiOfChangesController