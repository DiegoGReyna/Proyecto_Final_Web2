const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND} = require('../utils');
class ListsService {
  constructor() {
    this.lists = [];
    this.generate();
  }
  generate() {
    const limit = 99;
    for (let index = 0; index < limit; index++) {
      this.lists.push({
        id: index,
        name: 'Lista ' + index,
        quest: index,
        objective:[index, faker.datatype.number({max:99, min:0, precision: 1.00}), faker.datatype.number({max:99, min:0, precision: 1.00})],
        isActive: true,
      });
    }
  }

  async get(id){
    var user = this.lists.find((x) => x.id === id && x.isActive === true);
    validateData(user, NOTFOUND, 'list not found', (data) => !data);
    return user;
  }

  async create(quest,data){
    var nextIndex = this.lists.length;
    const newList = {
      id: nextIndex,
      ...data,
      quest: quest,
      isActive: true,
    };
    this.lists.push(newList);
    return newList;
  }




  async edit(id, changes) {
    const index = this.lists.findIndex((item) => item.id === id);
    if (index === -1) throw boom.notFound('List not found');
    //throw new Error('Product not found'); Forma tradicional
    var currentList = this.lists[index];
    this.lists[index] = {
      ...currentList,
      ...changes,
    };
    return this.lists[index];
  }


  async delete(id) {
    const index = this.lists.findIndex((item) => item.id === id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('List not found');
    }
    this.lists.splice(index, 1);
    return {
      message: 'List deleted successfully',
      id,
    };
  }

  async getAll(){
    var lists = this.lists;
    validateData(lists, NOTFOUND, 'lists not found', (data) => !data);
    return lists;
  }

  async addObjective(ListId, ObjectiveId) {
    const index = this.lists.findIndex((item) => item.id === ListId);
    if (index === -1) throw boom.notFound('list not found');
    var currentList = this.lists[index];
    currentList.objective.push(ObjectiveId)
    return currentList.objective;
  }
  async getObjectives(ListId){
    const index = this.lists.findIndex((item) => item.id === ListId);

    if (index === -1) throw boom.notFound('List not found');

    var currentList = this.lists[index];
    var Objective = [];
    currentList.objective.forEach(element => {
      var data = {};
      data.id = element;
      data.name = 'Objective ' + element;
      data.desc=faker.lorem.sentences(2);
      data.rol=[];
      data.isEnded=false;
      data.isActive=true;
      data.lists=faker.datatype.number({max:99, min:0, precision: 1.00});
      data.start=faker.date.recent();
      data.end=faker.date.soon();

      Objective.push(data);
    });

    return Objective;
  }
}

module.exports = ListsService;
