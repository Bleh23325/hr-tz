const Router = require('express')
const router = new Router()
// импорт объекта контролера, т.к буду делать через функции
const keysController = require('../Controller/keys.controller')

// Определяем маршруты для функций. первый параметр - url по которому отабатывается функция, второй - функция
router.post('/keys', keysController.createKeys)
router.get('/keys', keysController.getKeys)
router.get('/keys/:id', keysController.getOneKeys)
router.put('/keys/:id', keysController.updateKeys)
router.delete('/keys/:id', keysController.deleteKeys)


module.exports = router