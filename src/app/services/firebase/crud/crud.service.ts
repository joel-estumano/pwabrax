import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { User } from 'firebase/auth';
import { ScreenService } from '../../screen/screen.service';
import { TranslateService } from '../../translate/translate.service';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private screen: ScreenService,
    private translate: TranslateService
  ) {}

  collectionConstructor<T>(name) {
    return this.afs.collection<T>(name);
  }

  getAll(collection: AngularFirestoreCollection): Promise<any> {
    return new Promise((resolve, reject) => {
      const sub = collection.snapshotChanges().pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
      sub.subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  getLimit(path, length, limit, page = 1): Promise<any> {
    return new Promise((resolve, reject) => {
      let startAfter = length;
      if (page > 1) {
        startAfter = length - (page - 1) * limit;
      }
      const sub = this.afs
        .collection(path, (ref) =>
          ref.limit(limit).orderBy('index', 'desc').startAfter(startAfter)
        )
        .snapshotChanges()
        .pipe(
          map((actions) =>
            actions.map((a) => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, data };
            })
          )
        );
      sub.subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  get<T>(collection: AngularFirestoreCollection, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const sub = collection.doc<T>(id).valueChanges();
      sub.subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  add(collection: AngularFirestoreCollection, yourAsset): Promise<any> {
    return collection.add(yourAsset).catch((err) => {
      this.screen.presentToast(this.translate.verifyErrors(err.code));
    });
  }

  update(
    collection: AngularFirestoreCollection,
    yourAsset,
    id: string
  ): Promise<any> {
    console.log('asset - ', yourAsset);
    return collection
      .doc<any>(id)
      .update(yourAsset)
      .catch((err) => {
        this.screen.presentToast(this.translate.verifyErrors(err.code));
      });
  }

  async delete(
    collection: AngularFirestoreCollection,
    id: string
  ): Promise<any> {
    return collection
      .doc(id)
      .delete()
      .catch((err) => {
        this.screen.presentToast(this.translate.verifyErrors(err.code));
      });
  }

  async deleteMultiple(
    collection: AngularFirestoreCollection,
    objs
  ): Promise<any> {
    await this.screen.presentLoading();
    var batch = this.afs.firestore.batch();
    return new Promise((resolve, reject) => {
      objs.forEach((element) => {
        batch.delete(collection.doc(element.id).ref);
        if (element.downUrl) {
          const photoRef = this.storage.refFromURL(element.downUrl);
          photoRef.delete();
        }
      });
      batch
        .commit()
        .then((res) => {
          this.screen.dismissLoading();
          resolve(res);
        })
        .catch((err) => {
          this.screen.dismissLoading();
          reject(err);
        });
    });
  }

  //******* Uploads ******//

  async upload(id: string, file: string, storageFolder: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (file) {
        try {
          this.storage
            .ref(storageFolder)
            .child(id)
            .put(file)
            .then(() => {
              this.storage
                .ref(storageFolder + '/' + id)
                .getDownloadURL()
                .subscribe((url) => {
                  resolve(url);
                });
            })
            .catch((error) => {
              console.log(error);
              reject(false);
            });
        } catch (error) {
          console.log(error);
          reject(false);
        }
      } else {
        console.log('Else ');
        reject(false);
      }
    });
  }

  async deleteFireStorage(ref: string) {
    const photoRef = this.storage.refFromURL(ref);
    await photoRef.delete();
  }
}
