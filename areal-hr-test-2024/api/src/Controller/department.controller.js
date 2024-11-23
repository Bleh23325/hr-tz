const db = require('../../Connect')
class departmentController{
    // создание Отдела
        async createDepartment(req, res) {
            const { name, comments, organization } = req.body;
            console.log(name, comments, organization);
            try {
                const newDepartment = await db.query(
                    'INSERT INTO department(organization, name, comments) VALUES ($1, $2, $3) RETURNING *', 
                    [organization, name, comments]
                );
                res.json(`Отдел ${newDepartment.rows[0].name} добавлен в базу данных`);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при добавлении отдела', error });
            }
        }
        // просмотр организации
        async getDepartment(req, res) {
            try {
                const departments = await db.query('SELECT * FROM department');
                res.json(departments.rows);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении отдела', error });
            }
        }
    
        // возврат 1 Отдела по айди
        async getOneDepartment(req, res) {
            const { id } = req.params;
            try {
                const department = await db.query('SELECT * FROM department WHERE id_department = $1', [id]);
                if (department.rows.length === 0) {
                    res.status(404).json({ message: 'Отдел не найдена' });
                } else {
                    res.json(department.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении отдела', error });
            }
        }
    
        // обновление Отдела
        async updateDepartment(req, res) {
            const { id } = req.params;
            const { name, comments, organization } = req.body;
            try {
                const updatedDepartment = await db.query(
                    'UPDATE department SET organization = $1, name = $2, comments = $3 WHERE id_department = $4 RETURNING *', 
                    [organization, name, comments, id]
                );
                if (updatedDepartment.rows.length === 0) {
                    res.status(404).json({ message: 'Отдел не найдена' });
                } else {
                    res.json(`Отдел ${updatedDepartment.rows[0].name} обновлена`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении отдела', error });
            }
        }
    
        // удаление Отдела
        async deleteDepartment(req, res) {
            const { id } = req.params;
            try {
                const deleteDepartment = await db.query('DELETE FROM department WHERE id_department = $1 RETURNING *', [id]);
                if (deleteDepartment.rows.length === 0) {
                    res.status(404).json({ message: 'Отдел не найден' });
                } else {
                    res.json(`Отдел ${deleteDepartment.rows[0].name} удалён`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при удалении отдела', error });
            }
        }
    }
// экспортируем объект контроллера
module.exports = new departmentController