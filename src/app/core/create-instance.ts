export class CreateInstance {
  static get<T extends object>(type: new () => T, source: T): T {
    try {
      const instance = new type();
      const instanceMerge = Object.assign(instance, source);

      return instanceMerge;
    } catch (error) {
      throw new TypeError(`La instancia no fue creada debido al siguiente error:\n${ error }`);
    }
  }
}
