const db = require('../../Connect')
class organizationController{
    // создание организации
        async createOrganization(req, res) {
            const { name, comments } = req.body;
            console.log(name, comments);
            try {
                const newOrganization = await db.query(
                    'INSERT INTO organization(name, comments) VALUES ($1, $2) RETURNING *', 
                    [name, comments]
                );
                res.json(`Организация ${newOrganization.rows[0].name} добавлена в базу данных`);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при добавлении организации', error });
            }
        }
        // просмотр организации
        async getOrganization(req, res) {
            try {
                const organizations = await db.query('SELECT * FROM organization');
                res.json(organizations.rows);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении организаций', error });
            }
        }
    
        // возврат 1 организации по айди
        async getOneOrganization(req, res) {
            const { id } = req.params;
            try {
                const organization = await db.query('SELECT * FROM organization WHERE id_organization = $1', [id]);
                if (organization.rows.length === 0) {
                    res.status(404).json({ message: 'Организация не найдена' });
                } else {
                    res.json(organization.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении организация', error });
            }
        }
    
        // обновление организации
        async updateOrganization(req, res) {
            const { id } = req.params;
            const { name, comments } = req.body;
            try {
                const updatedOrganization = await db.query(
                    'UPDATE organization SET name = $1, comments = $2 WHERE id_organization = $3 RETURNING *', 
                    [name, comments, id]
                );
                if (updatedOrganization.rows.length === 0) {
                    res.status(404).json({ message: 'Организация не найдена' });
                } else {
                    res.json(`Организация ${updatedOrganization.rows[0].name} обновлена`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении организации', error });
            }
        }
    
        // удаление организации
        async deleteOrganization(req, res) {
            const { id } = req.params;
            try {
                const deletedOrganizations = await db.query('DELETE FROM organization WHERE id_organization = $1 RETURNING *', [id]);
                if (deletedOrganizations.rows.length === 0) {
                    res.status(404).json({ message: 'Организация не найдена' });
                } else {
                    res.json(`Организация ${deletedOrganizations.rows[0].name} удалена`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при удалении организации', error });
            }
        }
    }
// экспортируем объект контроллера
module.exports = new organizationController