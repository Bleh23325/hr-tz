const db = require('../../Connect')
class keysController{
    // создание прав доступа
    async createKeys(req, res) {
        const { user_name, password, root, worker } = req.body;
        console.log(user_name, password, root, worker);
        try {
            const newKey = await db.query(
                'INSERT INTO keys(user_name, password, root, worker) VALUES ($1,$2,$3,$4) RETURNING *', 
                [user_name, password, root, worker]
            );
            res.json(`Ключ ${newKey.rows[0].name} добавлен в базу данных`);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при добавлении ключа', error });
        }
    }
    
        // просмотр прав доступа
        async getKeys(req, res) {
            try {
                const keys = await db.query('SELECT * FROM keys');
                res.json(keys.rows);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении ключей', error });
            }
        }
    
        // возврат 1 прав доступа по айди
        async getOneKeys(req, res) {
            const { id } = req.params;
            try {
                const keys = await db.query('SELECT * FROM keys WHERE id_keys = $1', [id]);
                if (keys.rows.length === 0) {
                    res.status(404).json({ message: 'Ключ не найден' });
                } else {
                    res.json(keys.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении ключа', error });
            }
        }
    
        // обновление прав доступа
        async updateKeys(req, res) {
            const { id } = req.params;
            const { user_name, password, root, worker } = req.body;
            try {
                const updatedKeys = await db.query(
                    'UPDATE keys SET user_name = $1, password = $2, root = $3, worker = $4 WHERE id_roots = $5 RETURNING *', 
                    [user_name, password, root, worker, id]
                );
                if (updatedKeys.rows.length === 0) {
                    res.status(404).json({ message: 'Ключ не найден' });
                } else {
                    res.json(`Ключь ${updatedKeys.rows[0].name} обновлён`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении ключа', error });
            }
        }
    
        // удаление прав доступа
        async deleteKeys(req, res) {
            const { id } = req.params;
            try {
                const deleteKeys = await db.query('DELETE FROM keys WHERE id_keys = $1 RETURNING *', [id]);
                if (deleteKeys.rows.length === 0) {
                    res.status(404).json({ message: 'Ключ не найден' });
                } else {
                    res.json(`Ключ ${deleteKeys.rows[0].name} удалён`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при удалении ключа', error });
            }
        }
    }
// экспортируем объект контроллера
module.exports = new keysController