const express = require('express')
const jobTitleRouter = require('./src/routes/jobTitle.rotes')
const organizationRouter = require('./src/routes/organization.routes')
const departmentRouter = require('./src/routes/department.rotes')
const hiringRouter = require('./src/routes/hiring.routes')
const addressRouter = require('./src/routes/address.routes')
const workerRouter = require('./src/routes/worker.routes')
const rootsRouter = require('./src/routes/roots.routes')
const keysRouter = require('./src/routes/keys.roures')
const historiOfChangesRouter = require('./src/routes/histori_of_changes.route')
const personelOperationsRouter = require('./src/routes/personalOperation.route')
const passportRouter = require('./src/routes/passport.routes')
const photosRouter = require('./src/routes/photo.routes')
// задаём порт. значение после || задаёт порт в ручную, елси его нет в env
const PORT = process.env.PORT || 2508
const  app = express()



// обязательная штука для нормальной работы!
app.use(express.json())

// для должностей
app.use('/api', jobTitleRouter)

// для организация
app.use('/api', organizationRouter)

// для отделов
app.use('/api', departmentRouter)

// для "найма"
app.use('/api', hiringRouter)

// для адреса
app.use('/api', addressRouter)

// для работников
app.use('/api', workerRouter)

// для прав доступпа
app.use('/api', rootsRouter)

// для ключей доступа
app.use('/api', keysRouter)

// для истории изменений
app.use('/api', historiOfChangesRouter)

// для персональных операция
app.use('/api', personelOperationsRouter)

// для паспорта
app.use('/api', passportRouter)

// для фото паспорта
app.use('/api', photosRouter)

//вывод порта в консоль
app.listen(PORT, () => console.log(`Порт сервера: http://localhost:${PORT}`))