import * as Joi from 'joi';

export const JoiBookRepositoryScheme = Joi.object().keys({
  title: Joi.string().min(3).max(50).required(),
  author: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(0).max(350).required(),
});
