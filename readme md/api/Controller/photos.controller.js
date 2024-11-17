const db = require('../../Connect');

class PhotosController {
    // Добавление нового фото
    async createPhotos(req, res) {
        const { photo, passport } = req.body;
        console.log(photo, passport);
        try {
            const newPhoto = await db.query(
                'INSERT INTO photos(photo, passport) VALUES ($1, $2) RETURNING *',
                [photo, passport]
            );
            res.json({ message: `Фото добавлено в базу данных`, data: newPhoto.rows[0] });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при добавлении фото', error });
        }
    }

    // Получение всех фото
    async getPhotos(req, res) {
        try {
            const photos = await db.query('SELECT * FROM photos');
            res.json(photos.rows);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении фото', error });
        }
    }

    // Получение одного фото по ID
    async getOnePhoto(req, res) {
        const { id } = req.params;
        try {
            const photo = await db.query('SELECT * FROM photos WHERE id_photo = $1', [id]);
            if (photo.rows.length === 0) {
                res.status(404).json({ message: 'Фото не найдено' });
            } else {
                res.json(photo.rows[0]);
            }
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении фото', error });
        }
    }

    // Обновление информации о фото
    async updatePhotos(req, res) {
        const { id } = req.params;
        const { photo, passport } = req.body;
        try {
            const updatedPhoto = await db.query(
                'UPDATE photos SET photo = $1, passport = $2 WHERE id_photo = $3 RETURNING *',
                [photo, passport, id]
            );
            if (updatedPhoto.rows.length === 0) {
                res.status(404).json({ message: 'Фото не найдено' });
            } else {
                res.json({ message: `Фото обновлено`, data: updatedPhoto.rows[0] });
            }
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при обновлении фото', error });
        }
    }

    // Удаление фото
    async deletePhotos(req, res) {
        const { id } = req.params;
        try {
            const deletedPhoto = await db.query('DELETE FROM photos WHERE id_photo = $1 RETURNING *', [id]);
            if (deletedPhoto.rows.length === 0) {
                res.status(404).json({ message: 'Фото не найдено' });
            } else {
                res.json({ message: `Фото удалено`, data: deletedPhoto.rows[0] });
            }
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при удалении фото', error });
        }
    }
}

// Экспортируем объект контроллера
module.exports = new PhotosController();
