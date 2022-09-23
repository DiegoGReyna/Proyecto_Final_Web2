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
        id: index,
        isActive: true,
        name: 'Grupo ' + index,
        desc: faker.lorem.sentences(2),
        creator: index,
        creatorInfo: 'localhost:3000/api/v1/users/'+index,
        members: [index, faker.datatype.number({max:99, min:0, precision: 1.00}), faker.datatype.number({max:99, min:0, precision: 1.00})],
        membersInfo: 'localhost:3000/api/v1/groups/'+index+'/members',
        quests: [faker.datatype.number({max:99, min:0, precision: 1.00}), faker.datatype.number({max:99, min:0, precision: 1.00}), faker.datatype.number({max:99, min:0, precision: 1.00})],
        questsInfo: 'localhost:3000/api/v1/quests/groups/'+index,
        roles: [index*3, index*3+1, index*3+2],
        rolesInfo: 'localhost:3000/api/v1/quests/roles/'+index
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
      data.name = 'Quest ' + index;
      data.desc = faker.lorem.sentences(2);
      data.start = faker.date.recent();
      data.end = faker.date.soon();
      data.members = [index, faker.datatype.number({max:99, min:0, precision: 1.00}), faker.datatype.number({max:99, min:0, precision: 1.00})];
      data.membersInfo = 'localhost:3000/api/v1/quest/'+index+'/members';
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

  async create(creator, data){
    var nextIndex = this.groups.length;
    const newGroup = {
      id: nextIndex,
      ...data,
      creator: creator,
      creatorInfo: 'localhost:3000/api/v1/users/'+creator,
      members: [creator],
      membersInfo: 'localhost:3000/api/v1/groups/'+nextIndex+'/members',
      quests: [],
      questsInfo: 'localhost:3000/api/v1/quests/groups/'+nextIndex,
      roles: [],
      rolesInfo: 'localhost:3000/api/v1/quests/groups/'+nextIndex
    };
    this.groups.push(newGroup);
    return newGroup;
  }

  async edit(id, changes) {
    const index = this.groups.findIndex((item) => item.id === id);
    if (index === -1) throw boom.notFound('Group not found');
    //throw new Error('Product not found'); Forma tradicional

    var currentGroup = this.groups[index];
    this.groups[index] = {
      ...currentGroup,
      ...changes,
    };
    return this.groups[index];
  }

  async addMember(groupId, userId, role) {
    //role aun no se implementa por la organzación de la info falsa, pero se usará cuando se use la BD
    const index = this.groups.findIndex((item) => item.id === groupId);

    if (index === -1) throw boom.notFound('Group not found');
    //throw new Error('Product not found'); Forma tradicional

    var currentGroup = this.groups[index];
    currentGroup.members.push(userId)
    return currentGroup.members;
  }

  async editMemberRole(groupId, userId, role) {
    //role aun no se implemente por la organzación de la info falsa, pero se usará cuando se use la BD
    const index = this.groups.findIndex((item) => item.id === groupId);

    if (index === -1) throw boom.notFound('Group not found');
    //throw new Error('Product not found'); Forma tradicional

    var currentGroup = this.groups[index];

    //TODO: por como se organiza la info falsa aun no podemos hacer el editar rol, pero aquí irá
    if(!currentGroup.members.includes(userId)) throw boom.notFound('Member not found');
    var data = {};
    data.groupId = groupId;
    data.userId = userId;
    data.role = role;
    return data;
  }

  async getMembers(groupId){
    const index = this.groups.findIndex((item) => item.id === groupId);

    if (index === -1) throw boom.notFound('Group not found');

    var currentGroup = this.groups[index];
    var members = [];
    currentGroup.members.forEach(element => {
      var data = {};
      data.id = element;
      data.name = faker.internet.userName();
      data.mail = faker.internet.email();
      data.role = faker.name.jobTitle();
      members.push(data);
    });

    return members;
  }

  async delete(id) {
    const index = this.groups.findIndex((item) => item.id === id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Group not found');
    }
    this.groups.splice(index, 1);
    return {
      message: 'Group deleted successfully',
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
