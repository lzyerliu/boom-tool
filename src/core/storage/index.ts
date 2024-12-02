interface ProxyStorage {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => any;
  removeItem: (key: string) => void;
  clear: () => void;
}

// session storage
class SessionStorageProxy implements ProxyStorage {
  protected storage: ProxyStorage;

  constructor(storageModel: ProxyStorage) {
    this.storage = storageModel;
  }

  // 设置缓存
  public setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  // 获取缓存
  public getItem(key: string): any {
    return JSON.parse(this.storage.getItem(key));
  }

  // 移除缓存
  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  // 清空缓存
  public clear(): void {
    this.storage.clear();
  }

}

class LocalStorageProxy extends SessionStorageProxy implements ProxyStorage { };

export const storageSession = new SessionStorageProxy(sessionStorage);

export const storageLocal = new LocalStorageProxy(localStorage);

