const { CastError } = require('mongoose').Error;
const Card = require('../models/card');

const AccessDeniedError = require('../errors/AccessDeniedError');
const NotFoundError = require('../errors/NotFoundError');
const InvalidDataError = require('../errors/InvalidDataError');

// Вывод массива карточек а страницу
function getInitialCards(_, res, next) {
  Card
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

// Добавление новой карточки на страницу
function addCard(req, res, next) {
  const { name, link } = req.body;
  const { userId } = req.user;

  Card
    .create({ name, link, owner: userId })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError('Передача некорректных данных, при попытке добавления новой карточки на страницу.'));
      } else {
        next(err);
      }
    });
}

// Удаление карточки из массива
function deleteCard(req, res, next) {
  const { id: cardId } = req.params;
  const { userId } = req.user;

  Card
    .findById({
      _id: cardId,
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка c передаваемым ID не найдена');
      }

      const { owner: cardOwnerId } = card;

      if (cardOwnerId.valueOf() !== userId) {
        throw new AccessDeniedError('Нет прав доступа');
      }

      return Card.findByIdAndDelete(cardId);
    })
    .then((deletedCard) => {
      if (!deletedCard) {
        throw new NotFoundError('Данная карточка была удалена');
      }

      res.send({ data: deletedCard });
    })
    .catch(next);
}

// Постановка лайка на карточку
function addLikeToCard(req, res, next) {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card
    .findByIdAndUpdate(
      cardId,
      {
        $addToSet: {
          likes: userId,
        },
      },
      {
        new: true,
      },
    )
    .then((card) => {
      if (card) return res.send({ data: card });

      throw new NotFoundError('Карточка с данным ID не найдена');
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(
          new InvalidDataError(
            'Передача некорректных данных при попытке поставить лайк.',
          ),
        );
      } else {
        next(err);
      }
    });
}

// Удаление лайка с карточки
function deleteLikeFromCard(req, res, next) {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card
    .findByIdAndUpdate(
      cardId,
      {
        $pull: {
          likes: userId,
        },
      },
      {
        new: true,
      },
    )
    .then((card) => {
      if (card) return res.send({ data: card });

      throw new NotFoundError('Карточка c передаваемым ID не найдена');
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(
          new InvalidDataError(
            'Передача некорректных данных при попытке удаления лайка с карточки.',
          ),
        );
      } else {
        next(err);
      }
    });
}

module.exports = {
  getInitialCards,
  addCard,
  deleteCard,
  addLikeToCard,
  deleteLikeFromCard,
};
