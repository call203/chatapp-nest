import * as bcrypt from 'bcrypt';

export async function hashPassword(rawPassword: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(rawPassword, salt);
}

export async function compareHash(rawPassword: string, hashedPassword: string) {
  const isMatch = await bcrypt.compare(rawPassword, hashedPassword);
  return isMatch;
}
