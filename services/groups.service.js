const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND } = require('../utils');
class GroupService {
  constructor() {
    this.groups = [];
    this.generate();
  }
  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.groups.push({
        isActive: true,
        id: index,
        name: "Grupo " + index,
        desc: faker.lorem.sentences(2),
        creator: index,
        creatorInfo: "localhost:3000/api/v1.groups"+index,
        members: [index, faker.datatype.number({max:99, min:0, precision: 1.00}), faker.datatype.number({max:99, min:0, precision: 1.00})],
        membersInfo: "localhost:3000/api/v1/group/"+index+"/members",
        quests: [faker.datatype.number({max:99, min:0, precision: 1.00}), faker.datatype.number({max:99, min:0, precision: 1.00}), faker.datatype.number({max:99, min:0, precision: 1.00})],
        questsInfo: "localhost:3000/api/v1/quests/group/"+index
      });
    }
  }

  async getQuests(id){
    var group = this.groups.find((x) => x.id === id);
    validateData(group, NOTFOUND, 'Group not found', (data) => !data);
    var quests = [];
    for (let index = 0; index < 3; index++) {
      var data = {};
      data.id = index;
      data.name = "Quest " + index;
      data.desc = faker.lorem.sentences(2);
      data.start = faker.date.recent();
      data.end = faker.date.soon();
      data.members = [index, faker.datatype.number({max:99, min:0, precision: 1.00}), faker.datatype.number({max:99, min:0, precision: 1.00})];
      data.membersInfo = "localhost:3000/api/v1/quest/"+index+"/members";
      data.isEnded = true;
      data.isActive = true;
      quests.push(data);
    }
    return quests;
  }

  async getByUserId(id){
    var groups = this.groups.filter((x) => x.members.includes(id));
    validateData(groups, NOTFOUND, 'No groups available', (data) => !data);
    return groups;
  }

  async register(data){
    var nextIndex = this.groups.length;
    const newUser = {
      id: nextIndex,
      ...data
    };
    this.groups.push(newUser);
    return newUser;
  }

  async edit(id, changes) {
    const index = this.groups.findIndex((item) => item.id === id);
    if (index === -1) throw boom.notFound('User not found');
    //throw new Error('Product not found'); Forma tradicional

    var currentUser = this.groups[index];
    this.groups[index] = {
      ...currentUser,
      ...changes,
    };
    return this.groups[index];
  }

  async editComplete(id, changes) {
    const index = this.groups.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('User not found');
    //throw new Error('Product not found'); Forma tradicional

    var currentUser = this.groups[index];
    this.groups[index] = {
      id: currentUser.id,
      ...changes,
    };
    return this.groups[index];
  }

  async delete(id) {
    const index = this.groups.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('User not found');
    }
    this.groups.splice(index, 1);
    return {
      message: 'User deleted successfully',
      id,
    };
  }

  async getAll(){
    var groups = this.groups;
    validateData(groups, NOTFOUND, 'No encontrado', (data) => !data);
    return groups;
  }

}

module.exports = GroupService;
