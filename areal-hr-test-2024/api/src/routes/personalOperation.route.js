const Router = require('express')
const router = new Router()
// импорт объекта контролера, т.к буду делать через функции
const personelOperationsController = require('../Controller/personelOperations.controller')

// Определяем маршруты для функций. первый параметр - url по которому отабатывается функция, второй - функция
router.post('/personelOperations', personelOperationsController.createPersonelOperations)
router.get('/personelOperations', personelOperationsController.getPersonelOperations)
router.get('/personelOperations/:id', personelOperationsController.getOnePersonelOperations)
router.put('/personelOperations/:id', personelOperationsController.updatePersonelOperations)
router.delete('/personelOperations/:id', personelOperationsController.deletePersonelOperations)


module.exports = router