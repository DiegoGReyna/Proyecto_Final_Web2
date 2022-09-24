const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND} = require('../utils');
class objectivesService {
  constructor() {
    this.objectives = [];
    this.generate();
  }
  generate() {
    const limit = 99;
    for (let index = 0; index < limit; index++) {
      this.objectives.push({
        id: index,
        name: 'Objetivo' + index,
        participants:[index, faker.datatype.number({max:99, min:0, precision: 1.00}), faker.datatype.number({max:99, min:0, precision: 1.00})],
        desc: faker.lorem.sentences(2),
        rol:[],
        progress:faker.datatype.number({max:5, min:1, precision: 1.00}),
        isEnded: false,
        isActive: true,
        lists: faker.datatype.number({max:99, min:0, precision: 1.00}),
        start: faker.date.recent(),
        end: faker.date.soon(),

      });
    }
  }

  async get(id){
    var objectives = this.objectives.find((x) => x.id === id && x.isActive === true);
    validateData(objectives, NOTFOUND, 'Objective not found', (data) => !data);
    return objectives;
  }

  async create(data){
    var nextIndex = this.objectives.length;
    const newQuest = {
      id: nextIndex,
      ...data,
      isActive: true,
      isEnded: false,
      lists: [],
      listsInfo: 'localhost:3000/api/v1/quest/'+nextIndex+ '/lists'
    };
    this.objectives.push(newQuest);
    return newQuest;
  }


  async createObjective(Lista, data){
    var nextIndex = this.objectives.length;
    const newObjective = {
      id: nextIndex,
      ...data,
      lists: Lista,
      isEnded:false,
      isActive:true
    };
    this.objectives.push(newObjective);
    return newObjective;
  }

  async edit(id, changes) {
    const index = this.objectives.findIndex((item) => item.id === id);
    if (index === -1) throw boom.notFound('Quest not found');
    //throw new Error('Product not found'); Forma tradicional

    var currentQuest = this.objectives[index];
    this.objectives[index] = {
      ...currentQuest,
      ...changes,
    };
    return this.objectives[index];
  }


  async delete(id) {
    const index = this.objectives.findIndex((item) => item.id === id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Objective not found');
    }
    this.objectives.splice(index, 1);
    return {
      message: 'Objective deleted successfully',
      id,
    };
  }

  async deleteParticipant(ObjectiveId, userId) {
    const index = this.objectives.findIndex((item) => item.id === ObjectiveId);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Objective not found');
    }

    var currentOjective = this.objectives[index];
    if(!currentOjective.participants.includes(userId)) throw boom.notFound('Participant not found');

    const participantIndex = currentOjective.participants.findIndex((item) => item === userId);
    this.objectives[index].participants.splice(participantIndex, 1);
    return {
      message: 'Participant deleted successfully',
      userId,
    };
  }

  async getAll(){
    var objectives = this.objectives;
    validateData(objectives, NOTFOUND, 'Objetives not found', (data) => !data);
    return objectives;
  }

}

module.exports = objectivesService;
