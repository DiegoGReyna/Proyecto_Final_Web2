const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND} = require('../utils');
class QuestService {
  constructor() {
    this.quests = [];
    this.generate();
  }
  generate() {
    const limit = 25;
    for (let index = 0; index < limit; index++) {
      this.quests.push({
        id: index,
        name: 'Quest ' + index,
        desc: faker.lorem.sentences(2),
        start: faker.date.recent(),
        end: faker.date.soon(),
        isEnded: true,
        isActive: true,
        lists: [index, faker.datatype.number({max:99, min:0, precision: 1.00}), faker.datatype.number({max:99, min:0, precision: 1.00})],
        listsInfo: 'localhost:3000/api/v1/quest/'+index+ '/lists'
      });
    }
  }

  async get(id){
    var user = this.quests.find((x) => x.id === id && x.isActive === true);
    validateData(user, NOTFOUND, 'Quest not found', (data) => !data);
    return user;
  }

  async create(data){
    var nextIndex = this.quests.length;
    const newQuest = {
      id: nextIndex,
      ...data,
      isActive: true,
      isEnded: false,
      lists: [],
      listsInfo: 'localhost:3000/api/v1/quest/'+nextIndex+ '/lists'
    };
    this.quests.push(newQuest);
    return newQuest;
  }

  async edit(id, changes) {
    const index = this.quests.findIndex((item) => item.id === id);
    if (index === -1) throw boom.notFound('Quest not found');
    //throw new Error('Product not found'); Forma tradicional

    var currentQuest = this.quests[index];
    this.quests[index] = {
      ...currentQuest,
      ...changes,
    };
    return this.quests[index];
  }


  async delete(id) {
    const index = this.quests.findIndex((item) => item.id === id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Quest not found');
    }
    this.quests.splice(index, 1);
    return {
      message: 'Quest deleted successfully',
      id,
    };
  }

  async getAll(){
    var quests = this.quests;
    validateData(quests, NOTFOUND, 'Quests not found', (data) => !data);
    return quests;
  }
  async getLists(ListId){
    const index = this.quests.findIndex((item) => item.id === ListId);

    if (index === -1) throw boom.notFound('Lists not found');

    var currentList = this.quests[index];
    var lists = [];
    currentList.lists.forEach(element => {
      var data = {};
      data.id = element;
      data.name = 'Lista ' + index;
      lists.push(data);
    });

    return lists;
  }
}

module.exports = QuestService;
