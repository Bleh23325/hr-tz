const Router = require('express')
const router = new Router()
// импорт объекта контролера, т.к буду делать через функции
const historiOfChangesController = require('../Controller/histori_of_changes.controller')

// Определяем маршруты для функций. первый параметр - url по которому отабатывается функция, второй - функция
router.post('/historiOfChanges', historiOfChangesController.createHistoriOfChanges)
router.get('/historiOfChanges', historiOfChangesController.getHistoriOfChanges)
router.get('/historiOfChanges/:id', historiOfChangesController.getOneHistoriOfChanges)
router.put('/historiOfChanges/:id', historiOfChangesController.updateHistoriOfChanges)
router.delete('/historiOfChanges/:id', historiOfChangesController.deleteHistoriOfChanges)


module.exports = router