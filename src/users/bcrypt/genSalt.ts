import * as bcrypt from 'bcryptjs';

export const salt = bcrypt.genSaltSync(10);
