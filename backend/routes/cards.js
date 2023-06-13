const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { urlPattern } = require('../utils/constants');
const {
  getInitialCards,
  addCard,
  deleteCard,
  addLikeToCard,
  deleteLikeFromCard,
} = require('../controllers/cards');

// Маршрут для получения всех карточек:
router.get('/', getInitialCards);

// Маршрут для создания новой карточки:
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .pattern(urlPattern),
  }),
}), addCard);

// Маршрут для удаления карточки:
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

// Маршрут для добавления лайка на карточку:
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), addLikeToCard);

// Маршрут для удаления лайка с карточки:
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteLikeFromCard);

module.exports = router;
