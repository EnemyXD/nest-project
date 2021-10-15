import * as Joi from 'joi';

export const JoiUserScheme = Joi.object().keys({
  login: Joi.string().min(3).max(15).required(),
  password: Joi.string().min(6).required(),
});
