const db = require('../../Connect');
const { departmentCodeValidation } = require('../validations/passport.validation'); 

class PassportController {
    // Создание паспорта
    async createPassport(req, res) {
        const { passport_series, passport_number, date_of_issue, department_code, who_issue, worker } = req.body;

        // Валидация данных
        const validationResult = departmentCodeValidation({
            passport_series,
            passport_number,
            department_code,
        });

        if (validationResult.error) {
            return res.status(400).json({
                message: 'Ошибка валидации',
                error: validationResult.error.details.map((detail) => detail.message).join(', '),
            });
        }

        try {
            const newPassport = await db.query(
                `INSERT INTO passport (passport_series, passport_number, date_of_issue, department_code, who_issue, worker)
                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [passport_series, passport_number, date_of_issue, department_code, who_issue, worker]
            );
            res.status(201).json({
                message: 'Паспорт успешно добавлен',
                passport: newPassport.rows[0],
            });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при добавлении паспорта', error: error.message });
        }
    }

    // Просмотр всех паспортов
    async getPassport(req, res) {
        try {
            const passports = await db.query('SELECT * FROM passport');
            res.json(passports.rows);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении паспортов', error: error.message });
        }
    }

    // Получение одного паспорта по ID
    async getOnePassport(req, res) {
        const { id } = req.params;
        try {
            const passport = await db.query('SELECT * FROM passport WHERE id_passport = $1', [id]);
            if (passport.rows.length === 0) {
                return res.status(404).json({ message: 'Паспорт не найден' });
            }
            res.json(passport.rows[0]);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении паспорта', error: error.message });
        }
    }

    // Обновление паспорта
    async updatePassport(req, res) {
        const { id } = req.params;
        const { passport_series, passport_number, date_of_issue, department_code, who_issue, worker } = req.body;

        // Валидация данных
        const validationResult = departmentCodeValidation({
            passport_series,
            passport_number,
            department_code,
        });

        if (validationResult.error) {
            return res.status(400).json({
                message: 'Ошибка валидации',
                error: validationResult.error.details.map((detail) => detail.message).join(', '),
            });
        }

        try {
            const updatedPassport = await db.query(
                `UPDATE passport
                 SET passport_series = $1, passport_number = $2, date_of_issue = $3, department_code = $4, who_issue = $5, worker = $6
                 WHERE id_passport = $7 RETURNING *`,
                [passport_series, passport_number, date_of_issue, department_code, who_issue, worker, id]
            );

            if (updatedPassport.rows.length === 0) {
                return res.status(404).json({ message: 'Паспорт не найден' });
            }
            res.json({ message: 'Паспорт успешно обновлен', passport: updatedPassport.rows[0] });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при обновлении паспорта', error: error.message });
        }
    }

    // Удаление паспорта
    async deletePassport(req, res) {
        const { id } = req.params;
        try {
            const deletedPassport = await db.query('DELETE FROM passport WHERE id_passport = $1 RETURNING *', [id]);
            if (deletedPassport.rows.length === 0) {
                return res.status(404).json({ message: 'Паспорт не найден' });
            }
            res.json({ message: `Паспорт с ID ${id} успешно удален`, passport: deletedPassport.rows[0] });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при удалении паспорта', error: error.message });
        }
    }
}

module.exports = new PassportController();
