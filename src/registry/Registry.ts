export default class Registry {
  private dependencies: { [key: string]: any } = {};

  provide(key: string, dependency: any) {
    this.dependencies[key] = dependency;
  }

  inject(key: string): any {
    const dependency = this.dependencies[key];
    if (!dependency) {
      throw new Error(`Dependency ${key} not found`);
    }
    return dependency;
  }
}
