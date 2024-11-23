const Router = require('express')
const router = new Router()
// импорт объекта контролера, т.к буду делать через функции
const passportController = require('../Controller/passport.controller')

// Определяем маршруты для функций. первый параметр - url по которому отабатывается функция, второй - функция
router.post('/passport', passportController.createPassport)
router.get('/passport', passportController.getPassport)
router.get('/passport/:id', passportController.getOnePassport)
router.put('/passport/:id', passportController.updatePassport)
router.delete('/passport/:id', passportController.deletePassport)


module.exports = router