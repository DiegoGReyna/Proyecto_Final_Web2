const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND} = require('../utils');
class UserService {
  constructor() {
    this.users = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        isActive: faker.datatype.boolean(),
        id: index,
        name: faker.internet.userName(),
        mail: faker.internet.email(),
        password: faker.internet.password(),
        image: faker.datatype.number({max:9, min:0, precision: 1.00})
      });
    }
  }

  async login(mail){
    var login = this.users.find((x) => x.mail === mail && x.isActive === true);
    validateData(login, NOTFOUND, 'User not found', (data) => !data);
    var data = {};
    data.name = login.name;
    data.password = login.password;
    return data;
  }

  async get(id){
    var user = this.users.find((x) => x.id === id && x.isActive === true);
    validateData(user, NOTFOUND, 'User not found', (data) => !data);
    return user;
  }

  async register(data){
    var nextIndex = this.users.length;
    const newUser = {
      id: nextIndex,
      ...data
    };
    this.users.push(newUser);
    return newUser;
  }

  async edit(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) throw boom.notFound('User not found');
    //throw new Error('Product not found'); Forma tradicional

    var currentUser = this.users[index];
    this.users[index] = {
      ...currentUser,
      ...changes,
    };
    return this.users[index];
  }

  async editComplete(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('User not found');
    //throw new Error('Product not found'); Forma tradicional

    var currentUser = this.users[index];
    this.users[index] = {
      id: currentUser.id,
      ...changes,
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('User not found');
    }
    this.users.splice(index, 1);
    return {
      message: 'User deleted successfully',
      id,
    };
  }

  async getAll(){
    var users = this.users;
    validateData(users, NOTFOUND, 'No encontrado', (data) => !data);
    return users;
  }

}

module.exports = UserService;
