const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND } = require('../utils');
class AchievementsService {
  constructor() {
    this.achievements = [];
    this.generate();
  }
  generate() {
    const limit = 20;
    for (let index = 0; index < limit; index++) {
      this.achievements.push({
        id: index,
        isActive: true,
        name: 'Logro ' + index,
        desc: faker.lorem.sentences(2)
      });
    }
  }

  async getById(id){
    var achievement = this.achievements.find((x) => x.id === id);
    validateData(achievement, NOTFOUND, 'Achievement not found', (data) => !data);
    return achievement;
  }

  async create(data){
    var nextIndex = this.achievements.length;
    const newAchievement = {
      id: nextIndex,
      ...data
    };
    this.achievements.push(newAchievement);
    return newAchievement;
  }

  async edit(id, changes) {
    const index = this.achievements.findIndex((item) => item.id === id);
    if (index === -1) throw boom.notFound('Achievement not found');
    //throw new Error('Product not found'); Forma tradicional

    var currentAchievement = this.achievements[index];
    this.achievements[index] = {
      ...currentAchievement,
      ...changes,
    };
    return this.achievements[index];
  }

  async delete(id) {
    const index = this.achievements.findIndex((item) => item.id === id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Group not found');
    }
    this.achievements.splice(index, 1);
    return {
      message: 'Achievement deleted successfully',
      id,
    };
  }

  async getAll(){
    var achievements = this.achievements;
    validateData(achievements, NOTFOUND, 'No encontrado', (data) => !data);
    return achievements;
  }

}

module.exports = AchievementsService;
