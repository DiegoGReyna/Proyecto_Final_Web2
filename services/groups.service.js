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
        questsInfo: 'localhost:3000/api/v1/groups/'+index+'quests',
        roles: [index*3, index*3+1, index*3+2],
        rolesInfo: 'localhost:3000/api/v1/groups'+index+'/roles/'
      });
    }
  }

  async getQuests(id){
    var group = this.groups.find((x) => x.id === id);
    validateData(group, NOTFOUND, 'Group not found', (data) => !data);
    var quests = [];
    group.quests.forEach(element => {
      var data = {};
      data.id = element;
      data.name = 'Quest ' + element;
      data.desc = faker.lorem.sentences(2);
      data.start = faker.date.recent();
      data.end = faker.date.soon();
      data.isEnded = true;
      data.isActive = true;
      data.lists = [],
      data.listsInfo = 'localhost:3000/api/v1/quest/'+element+ '/lists'
      quests.push(data);
    });
    return quests;
  }

  async getByUserId(id){
    var groups = this.groups.filter((x) => x.members.includes(id));
    validateData(groups, NOTFOUND, 'No groups available', (data) => !data);
    return groups;
  }

  async getById(id){
    var group = this.groups.find((x) => x.id === id && x.isActive === true);
    validateData(group, NOTFOUND, 'Group not found', (data) => !data);
    return group;
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

  async createGroupQuest(groupId, data) {
    //data aun no se implementa por la organzación de la info falsa, pero se usará cuando se use la BD
    const index = this.groups.findIndex((item) => item.id === groupId);

    if (index === -1) throw boom.notFound('Group not found');
    //throw new Error('Product not found'); Forma tradicional

    var currentGroup = this.groups[index];
    currentGroup.quests.push(faker.datatype.number({precision:1.00}))
    return data;
  }

  async deleteGroupQuest(groupId, questId) {
    //data aun no se implementa por la organzación de la info falsa, pero se usará cuando se use la BD
    const index = this.groups.findIndex((item) => item.id === groupId);

    if (index === -1) throw boom.notFound('Group not found');
    //throw new Error('Product not found'); Forma tradicional

    var currentGroup = this.groups[index];
    if(!currentGroup.quests.includes(questId)) throw boom.notFound('Quest not found');

    const questIndex = currentGroup.quests.findIndex((item) => item === questId);
    this.groups[index].quests.splice(questIndex, 1);
    return {
      message: 'Quest deleted successfully',
      questId,
    };
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

  async getRoles(groupId){
    const index = this.groups.findIndex((item) => item.id === groupId);

    if (index === -1) throw boom.notFound('Group not found');

    var currentGroup = this.groups[index];
    var roles = [];
    currentGroup.roles.forEach(element => {
      var data = {};
      data.id = element;
      data.role = faker.name.jobTitle();
      roles.push(data);
    });

    return roles;
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

  async deleteMember(groupId, userId) {
    const index = this.groups.findIndex((item) => item.id === groupId);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Group not found');
    }

    var currentGroup = this.groups[index];
    if(!currentGroup.members.includes(userId)) throw boom.notFound('Member not found');

    if(currentGroup.creator === userId) throw boom.conflict('Cannot delete group creator');

    const memberIndex = currentGroup.members.findIndex((item) => item === userId);
    this.groups[index].members.splice(memberIndex, 1);
    return {
      message: 'Member deleted successfully',
      userId,
    };
  }

  async getAll(){
    var groups = this.groups;
    validateData(groups, NOTFOUND, 'Groups not found', (data) => !data);
    return groups;
  }

}

module.exports = GroupService;
