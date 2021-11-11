import bcryptjs from "bcryptjs";
export class Hash {
  /**
   *
   * @param value
   * @param saltLength
   * @returns
   */
  static make(value: string, saltLength: number = 10): string {
    const defaultSalt = bcryptjs.genSaltSync(saltLength);

    return bcryptjs.hashSync(value, defaultSalt);
  }
}
