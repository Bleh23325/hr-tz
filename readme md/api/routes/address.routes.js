const Router = require('express')
const router = new Router()
// импорт объекта контролера, т.к буду делать через функции
const addressController = require('../Controller/address.controller')

// Определяем маршруты для функций. первый параметр - url по которому отабатывается функция, второй - функция
router.post('/address', addressController.createAddress)
router.get('/address', addressController.getAddress)
router.get('/address/:id', addressController.getOneAddress)
router.put('/address/:id', addressController.updateAddress)
router.delete('/address/:id', addressController.deleteAddress)


module.exports = router