const Router = require('express')
const router = new Router()
// импорт объекта контролера, т.к буду делать через функции
const organizationController = require('../Controller/organization.controller')

// Определяем маршруты для функций. первый параметр - url по которому отабатывается функция, второй - функция
router.post('/organization', organizationController.createOrganization)
router.get('/organization', organizationController.getOrganization)
router.get('/organization/:id', organizationController.getOneOrganization)
router.put('/organization/:id', organizationController.updateOrganization)
router.delete('/organization/:id', organizationController.deleteOrganization)


module.exports = router