const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const { urlPattern } = require('../utils/constants');

const cardSchema = new Schema(
  {

    name: {
      type: String,
      required: [true, 'Имя карточки обязательное поле'],
      minlength: [2, 'Имя карточки должно содержать минимум 2 символа'],
      maxlength: [30, 'Имя карточки должно содержать максимум 30 символов'],
    },

    link: {
      type: String,
      required: true,
      validate: {
        validator: (url) => urlPattern.test(url),
        message: 'Введите URL',
      },
    },

    owner: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },

    likes: [{
      type: ObjectId,
      ref: 'user',
      default: [],
    }],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
