const db = require('../../Connect')
class rootsController{
    // создание прав доступа
    async createRoots(req, res) {
        const { name } = req.body;
        console.log(name);
        try {
            const newRoots = await db.query(
                'INSERT INTO roots(name) VALUES ($1) RETURNING *', 
                [name]
            );
            res.json(`Права дуступа ${newRoots.rows[0].name} добавлены в базу данных`);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при добавлении прав доступа', error });
        }
    }
    
        // просмотр прав доступа
        async getRoots(req, res) {
            try {
                const Roots = await db.query('SELECT * FROM roots');
                res.json(Roots.rows);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении прав доступа', error });
            }
        }
    
        // возврат 1 прав доступа по айди
        async getOneRoots(req, res) {
            const { id } = req.params;
            try {
                const Root = await db.query('SELECT * FROM roots WHERE id_roots = $1', [id]);
                if (Root.rows.length === 0) {
                    res.status(404).json({ message: 'Права доступа не найдены' });
                } else {
                    res.json(Root.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении прав доступа', error });
            }
        }
    
        // обновление прав доступа
        async updateRoots(req, res) {
            const { id } = req.params;
            const { name } = req.body;
            try {
                const updateRoots = await db.query(
                    'UPDATE roots SET name = $1 WHERE id_roots = $2 RETURNING *', 
                    [name, id]
                );
                if (updateRoots.rows.length === 0) {
                    res.status(404).json({ message: 'Права дуступа не найдены' });
                } else {
                    res.json(`Права дуступа ${updateRoots.rows[0].name} обновлены`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении прав доступа', error });
            }
        }
    
        // удаление прав доступа
        async deleteRoots(req, res) {
            const { id } = req.params;
            try {
                const deleteRoots = await db.query('DELETE FROM roots WHERE id_roots = $1 RETURNING *', [id]);
                if (deleteRoots.rows.length === 0) {
                    res.status(404).json({ message: 'Права доступа не найдены' });
                } else {
                    res.json(`Права доступы ${deleteRoots.rows[0].name} удалены`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при удалении прав доступа', error });
            }
        }
    }
// экспортируем объект контроллера
module.exports = new rootsController