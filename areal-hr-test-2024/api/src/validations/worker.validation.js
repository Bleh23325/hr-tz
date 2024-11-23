const Joi = require('joi');

exports.workerValidation = (data) => {
    const schema = Joi.object({
        phone: Joi.string()
            .pattern(/^(?:\+7|8)[\s\(]?\d{3}[\s\)-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/) // обновлённая маска для русского номера телефона
            .required()
            .messages({
                'string.empty': 'Телефон обязателен.',
                'string.pattern.base': 'Телефон должен быть в формате: +7 999 999-99-99 или 8 999 999 99 99.',
            }),
    });

    return schema.validate(data); // возвращаем результат валидации
}
