import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';

@Injectable()
export class Core {
  // Recebe os valores padrão da classe
  public value;

  // Recebe o caminho de cacheamento
  public cachePath;

  // Recebe o nome da collection do firebase
  public path;

  // Recebe a collection do firebase
  public collection: AngularFirestoreCollection;

  public finder: any = [];

  public pagesLength: number;

  constructor(public getter: HelperGetterService) { }

  /* 
  Getters and Setters
  */
  get<T>(): T {
    return this.value;
  }

  set<T>(value: T) {
    this.value = value;
    // this.pagesLength = this.getter.pagination.getPagesLength(this.value);
  }

  fill(res) {
    const finder: any = [];
    res.map((e: any) => {
      finder[e.id] = e;
    });
    this.finder = finder;
  }

  find(id: string) {
    return this.finder[id];
  }

  /* 
  Cache
  */
  getCache(cachePath?) {
    return this.getter.cache.get(cachePath ? cachePath : this.cachePath);
  }

  async setCache(value, cachePath?) {
    return await this.getter.cache.set(
      cachePath ? cachePath : this.cachePath,
      value
    );
  }

  async setCacheArray(page, cachePath?) {
    return await this.getter.cache.setArray(
      cachePath ? cachePath : this.cachePath,
      this.value,
      page
    );
  }

  async removeCache(cachePath?) {
    return await this.getter.cache.remove(
      cachePath ? cachePath : this.cachePath
    );
  }

  /* 
  Firebase CRUD
  */

  add<T>(object, collection?): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!object.createdAt) object.createdAt = new Date();
      this.getter.crud
        .add(collection ? collection : this.collection, object)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getHttp<T>(id: string, collection?, type?): Promise<T> {
    const res = await this.getter.crud.get(
      collection ? collection : this.collection,
      id
    );
    return res;
  }

  getLimit<T>(length, limit, page?, path?): Promise<T> {
    return new Promise((resolve, reject) => {
      this.getter.crud
        .getLimit(path ? path : this.path, length, limit, page)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          this.getter.screen.presentToast(
            this.getter.translate.verifyErrors(err.code)
          );
          reject(err);
        });
    });
  }

  getAllHttp(collection?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getter.crud
        .getAll(collection ? collection : this.collection)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          this.getter.screen.presentToast(
            this.getter.translate.verifyErrors(err.code)
          );
          reject(err);
        });
    });
  }

  /* Update */
  update<T>(who: any, id, collection?): Promise<T> {
    return new Promise((resolve, reject) => {
      this.getter.crud
        .update(collection ? collection : this.collection, who, id)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /* Delete */
  async delete(id, withImage = false, path?, collection?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getter.crud
        .delete(collection ? collection : this.collection, id)
        .then((res) => {
          if (withImage && (path || this.path)) {
            if (typeof path === 'object') {
              path.forEach((e) => {
                this.getter.crud
                  .deleteFireStorage(e)
                  .then((res) => {
                    resolve(res);
                  })
                  .catch((err) => {
                    reject(err);
                  });
              });
            } else {
              this.getter.crud
                .deleteFireStorage(path ? path : this.path)
                .then((res) => {
                  resolve(res);
                })
                .catch((err) => {
                  reject(err);
                });
            }
          } else {
            resolve(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async deleteMultiple(ids, withImage = false, collection?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getter.crud
        .deleteMultiple(collection ? collection : this.collection, ids)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  setClassById<T>(id, update = false, cachePath?, collection?): Promise<T> {
    return new Promise((resolve, reject) => {
      this.getter.cache.get(cachePath ? cachePath : this.cachePath).then((cache) => {
        if (!cache || update) {
          this.getter.crud.get(collection ? collection : this.collection, id).then((http) => {
            this.getter.cache.set(cachePath ? cachePath : this.cachePath, http);
            this.set(http);
            resolve(http);
          }).catch((err) => {
            console.warn(err);
            reject(err);
          });
        } else {
          this.getter.cache.get(cachePath ? cachePath : this.cachePath).then((cache) => {
            this.set(cache);
            resolve(cache);
          }).catch(() => {
            console.warn('Failed to update');
            resolve(cache);
          });
        }
      });
    });
  }

  setClassAll<T>(update = true, set = true, cachePath?, collection?): Promise<Array<T>> {
    return new Promise((resolve, reject) => {
      this.getter.cache.get(cachePath ? cachePath : this.cachePath)
        .then((cache) => {
          if (!cache || update) {
            this.getAllHttp(collection ? collection : this.collection).then((res) => {
              this.getter.cache.set(cachePath ? cachePath : this.cachePath, res);
              if (set) this.set(res);
              resolve(res);
            }).catch((err) => {
              this.getter.screen.presentToast(
                this.getter.translate.verifyErrors(err.code)
              );
              reject(err);
            });
          } else {
            this.getter.cache.get(cachePath).then((cache) => {
              if (set) this.set(cache);
              resolve(cache);
            }).catch(() => {
              console.warn('Failed to update');
              resolve(cache);
            });
          }
        });
    });
  }
}
