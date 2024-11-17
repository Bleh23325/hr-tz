const Router = require('express')
const router = new Router()
// импорт объекта контролера, т.к буду делать через функции
const photosController = require('../Controller/photos.controller')

// Определяем маршруты для функций. первый параметр - url по которому отабатывается функция, второй - функция
router.post('/photos', photosController.createPhotos)
router.get('/photos', photosController.getPhotos)
router.get('/photos/:id', photosController.getOnePhoto)
router.put('/photos/:id', photosController.updatePhotos)
router.delete('/photos/:id', photosController.deletePhotos)


module.exports = router