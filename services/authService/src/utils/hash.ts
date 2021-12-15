import bcryptjs from "bcryptjs";

export class Hash {
  /**
   * Generate Salted Encrypted Hash
   * @param value
   * @param saltLength
   * @returns
   */
  static make(value: string, saltLength: number = 10): string {
    const defaultSalt = bcryptjs.genSaltSync(saltLength);

    return bcryptjs.hashSync(value, defaultSalt);
  }
  /**
   * Compare Hash with Plain Text
   * @param value
   * @param hash
   * @returns
   */
  static check(value: string, hash: string): boolean {
    return bcryptjs.compareSync(value, hash);
  }
}
