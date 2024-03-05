import { Injectable } from '@angular/core';
import { Core } from '../core/core';
import { HelperGetterService } from 'src/app/services/helpers/helpers/helper-getter.service';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from 'src/app/interfaces/user';
import { PeopleManagerService } from 'src/app/services/helpers/managers/people-manager.service';

@Injectable()
export class UserClass extends Core {
  // Clientes -> Cliente
  // Parceiros -> Técnico, Parceiro, Analista, Financeiro
  override cachePath = 'Users';
  override path = 'Users';
  public levels: any = [
    { level: '1', name: 'Cliente', data: [] },
    { level: '2', name: 'Técnico', data: [] },
    { level: '3', name: 'Parceiro', data: [] },
    { level: '4', name: 'Analista', data: [] },
    { level: '5', name: 'Financeiro', data: [] },
    { level: '6', name: 'Caixa', data: [] },
    { level: '7', name: 'Admin', data: [] },
    { level: '8', name: 'Fornecedor', data: [] },
  ];
  public levelsFinder = [];
  public allUsers: User[] = [];
  public toUpdate: User = {};
  public displayEmail = '';

  public findLevel: any = [];
  
  constructor(
    public override getter: HelperGetterService,
    private people: PeopleManagerService
  ) {
    super(getter);
    this.collection = this.getter.crud.collectionConstructor(this.path);
  }

  fillLevels() {
    this.findLevel = [];
    const user = this.value;
    this.levels.forEach((level) => {
      if (level) {
        if (user.level === '3' && level.name === 'Cliente') {
          level.data = level.data.filter((user) => {
            if (user.associate_to === this.value.id) return user;
          });
        }
        this.findLevel[level.level] = level;
      }
    });
  }

  finderLevel(level) {
    const levelFinder = Array.isArray(level) ? level : [level];
    const users: any = [];
    levelFinder.forEach((item) => {
      this.findLevel[item].data.forEach((user) => {
        // verificar se a pessoa tem nome cadastrado
        if (user.nome) {
          users.push(user);
        }
      });
      // users.push(...this.findLevel[item].data);
    });
    return users;
  }

  setUsersFromLevel() {
    this.levels.forEach((level) => {
      level.data = this.allUsers.filter((user) => {
        if (user.level === level.level) {
          user.levelName = this.getFromLevel(user.level).name;
          if (user.level === '1' && this.value.level === '3') {
            if (user.associate_to === this.value.id) return user;
          }
          return user;
        }
      });
    });
    this.fillLevels();
    this.setPeopleData();
  }

  setPeopleData() {
    // Apenas os Clientes
    this.people.clients.data = this.people.clients.makeData(
      this.levels[0].data,
      this.value.level
    );
    this.levelsFinder['clients'] = [this.levels[0]];

    this.people.headers = this.people.clients.headers;
    this.people.data = this.people.clients.data;

    // Parceiro, Analista, Financeiro, Caixa
    this.people.partners.data = this.people.partners.makeData(
      [...this.levels[2].data],
      this.value.level
    );
    this.levelsFinder['partners'] = [this.levels[2]];

    // Tecnicos
    this.people.colaborators.data = this.people.colaborators.makeData(
      [
        ...this.levels[1].data,
        ...this.levels[3].data,
        ...this.levels[4].data,
        ...this.levels[5].data,
      ],
      this.value.level
    );
    this.levelsFinder['colaborators'] = [
      this.levels[1],
      this.levels[3],
      this.levels[4],
      this.levels[5],
    ];

    // Fornecedores
    this.people.suppliers.data = this.people.suppliers.makeData(
      this.levels[7].data,
      this.value.level
    );
    this.levelsFinder['suppliers'] = [this.levels[7]];
  }

  getFromLevel(level) {
    const users = this.levels.find((item) => {
      return item.level.toString() === level.toString();
    });
    return users;
  }

  addUser(
    yourAsset: User,
    uid: string,
    collection?: AngularFirestoreCollection
  ) {
    const collectionRef = collection ? collection : this.collection;
    const userData: User = {};
    Object.keys(yourAsset).forEach((key) => {
      if (key !== 'password') userData[key] = yourAsset[key];
    });
    if (uid) userData.id = uid;
    userData.createdAt = new Date();
    return collectionRef.doc(uid).set(userData);
  }

  async updateUser(yourAsset: User, id?) {
    const userData: User = await this.getCache();
    Object.keys(yourAsset).map((key) => {
      if (yourAsset[key] !== this.value[key] || !this.value[key])
        userData[key] = yourAsset[key];
    });
    return this.collection.doc(id ? id : this.value.id).update(userData);
  }
}
