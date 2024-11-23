const db = require('../../Connect');

class PhotosController {
    // Добавление нового фото
    async createPhotos(req, res) {
        const { name,path,worker } = req.body;
        try {
            const newPhoto = await db.query(
                'INSERT INTO files(name,path,worker) VALUES ($1, $2, $3) RETURNING *',
                [name,path,worker]
            );
            res.json({ message: `Фото добавлено в базу данных`, data: newPhoto.rows[0] });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при добавлении фото', error });
        }
    }

    // Получение всех фото
    async getPhotos(req, res) {
        try {
            const photos = await db.query('SELECT * FROM files');
            res.json(photos.rows);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении фото', error });
        }
    }

    // Получение одного фото по ID
    async getOnePhoto(req, res) {
        const { id } = req.params;
        try {
            const photo = await db.query('SELECT * FROM files WHERE id_files = $1', [id]);
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
        const { name,path,worker } = req.body;
        try {
            const updatedPhoto = await db.query(
                'UPDATE files SET name = $1, path = $2, worker = $3 WHERE id_files = $4 RETURNING *',
                [name,path,worker, id]
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
            const deletedPhoto = await db.query('DELETE FROM files WHERE id_files = $1 RETURNING *', [id]);
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
