import bcrypt from "bcrypt";
export const hashPassword = (plainPassword: string) => {
  return bcrypt.hashSync(plainPassword, 10);
};
export const comparePassword: any = (
  plainPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
