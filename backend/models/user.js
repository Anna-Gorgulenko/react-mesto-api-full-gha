const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const { urlPattern } = require('../utils/constants');
const AuthenticationError = require('../errors/AuthenticationError');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => /.+@.+\..+/.test(email),
        message: 'Введите электронный адрес',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'Имя пользователя должно быть длиной от 2 до 30 символов'],
      maxlength: [30, 'Имя пользователя должно быть длиной от 2 до 30 символов'],
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: [2, 'Информация о пользователе должна быть длиной от 2 до 30 символов'],
      maxlength: [30, 'Информация о пользователе должна быть длиной от 2 до 30 символов'],
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => urlPattern.test(url),
        message: 'Введите URL',
      },
    },
  },
  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email })
          .select('+password')
          .then((user) => {
            if (user) {
              return bcrypt.compare(password, user.password).then((matched) => {
                if (matched) return user;
                return Promise.reject(new AuthenticationError('Неправильные почта или пароль'));
              });
            }
            return Promise.reject(new AuthenticationError('Неправильные почта или пароль'));
          });
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
