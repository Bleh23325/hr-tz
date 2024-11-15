const db = require('../../Connect')
class addressController{
    // создание адреса
    async createAddress(req, res) {
        const { region, settlement, street, house, building, apartment, worker } = req.body;
        console.log(region, settlement, street, house, building, apartment, worker);
        try {
            const newAddress = await db.query(
                'INSERT INTO address(region, settelment, street, house, building, apartment, worker) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
                [region, settlement, street, house, building, apartment, worker]
            );
            res.json({ message: 'Адрес добавлен в базу данных', address: newAddress.rows[0] });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при добавлении адреса', error: error.message });
        }
    }
    
        // просмотр адреса
        async getAddress(req, res) {
            try {
                const addresses = await db.query('SELECT * FROM address');
                res.json(addresses.rows);
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении адреса', error });
            }
        }
    
        // возврат 1 адреса по айди
        async getOneAddress(req, res) {
            const { id } = req.params;
            try {
                const address = await db.query('SELECT * FROM address WHERE id_address = $1', [id]);
                if (address.rows.length === 0) {
                    res.status(404).json({ message: 'Адресс не найден' });
                } else {
                    res.json(address.rows[0]);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при получении адреса', error });
            }
        }
    
        // обновление адреса
        async updateAddress(req, res) {
            const { id } = req.params;
            const { region,settlement, street, house, building, apartment, worker } = req.body;
            try {
                const updatedAddress = await db.query(
                    'UPDATE address SET region = $1,settelment = $2, street = $3, house= $4, building = $5, apartment = $6, worker = $7 WHERE id_address = $8 RETURNING *', 
                    [region,settlement, street, house, building, apartment, worker, id]
                );
                if (updatedAddress.rows.length === 0) {
                    res.status(404).json({ message: 'Адрес не найден' });
                } else {
                    res.json(`Адрес ${updatedAddress.rows[0].name} обновлён`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении адреса', error });
            }
        }
    
        // удаление адреса
        async deleteAddress(req, res) {
            const { id } = req.params;
            try {
                const deleteAddress = await db.query('DELETE FROM address WHERE id_address = $1 RETURNING *', [id]);
                if (deleteAddress.rows.length === 0) {
                    res.status(404).json({ message: 'Адрес не найден' });
                } else {
                    res.json(`Адрес ${deleteAddress.rows[0].name} удалён`);
                }
            } catch (error) {
                res.status(500).json({ message: 'Ошибка при удалении адреса', error });
            }
        }
    }
// экспортируем объект контроллера
module.exports = new addressController