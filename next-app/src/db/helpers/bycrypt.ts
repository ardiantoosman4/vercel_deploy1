import bcrypt from "bcryptjs";

export function hashPassword(plainPassword: string) {
  return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10));
}
export function comparePassword(plainPassword: string, hashPassword: string) {
  return bcrypt.compareSync(plainPassword, hashPassword);
}
