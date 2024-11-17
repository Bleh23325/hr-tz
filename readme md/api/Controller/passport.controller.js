const db = require('../../Connect')
class passportController{
    // создание паспорта
    async createPassport(req, res) {
        const { passport_series,passport_number,date_of_issue,department_code,who_issue,photo,worker } = req.body;
        console.log(passport_series,passport_number,date_of_issue,department_code,who_issue,photo,worker);
        try {
            const newPassport = await db.query(
                'INSERT INTO passport(passport_series,passport_number,date_of_issue,department_code,who_issue,photo,worker) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
                [passport_series,passport_number,date_of_issue,department_code,who_issue,photo,worker]
            );
            res.json({ message: 'Паспорт добавлен в базу данных', address: newPassport.rows[0] });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при добавлении паспорта', error: error.message });
        }
    }
    
        // просмотр паспорта
        async getPassport(req, res) {
            try {
                const passports = await db.query('SELECT * FROM passport');
                res.json(passports.rows);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении паспорта', error });
            }
        }
    
        // возврат 1 паспорта по айди
        async getOnePassport(req, res) {
            const { id } = req.params;
            try {
                const passport = await db.query('SELECT * FROM passport WHERE id_passport = $1', [id]);
                if (passport.rows.length === 0) {
                    res.status(404).json({ message: 'Паспорт не найден' });
                } else {
                    res.json(passport.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении паспорта', error });
            }
        }
    
        // обновление паспорта
        async updatePassport(req, res) {
            const { id } = req.params;
            const { passport_series,passport_number,date_of_issue,department_code,who_issue,photo,worker } = req.body;
            try {
                const updatePassport = await db.query(
                    'UPDATE passport SET passport_series = $1,passport_number = $2, date_of_issue = $3, department_code= $4, who_issue = $5, photo = $6, worker = $7 WHERE id_passport = $8 RETURNING *', 
                    [passport_series,passport_number,date_of_issue,department_code,who_issue,photo,worker, id]
                );
                if (updatePassport.rows.length === 0) {
                    res.status(404).json({ message: 'Паспорт не найден' });
                } else {
                    res.json(`Паспорт ${updatePassport.rows[0].name} обновлён`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении паспорта', error });
            }
        }
    
        // удаление паспорта
        async deletePassport(req, res) {
            const { id } = req.params;
            try {
                const deletePassport = await db.query('DELETE FROM passport WHERE id_passport = $1 RETURNING *', [id]);
                if (deletePassport.rows.length === 0) {
                    res.status(404).json({ message: 'Паспорт не найден' });
                } else {
                    res.json(`Паспорт ${deletePassport.rows[0].name} удалён`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при удалении паспорта', error });
            }
        }
    }
// экспортируем объект контроллера
module.exports = new passportController