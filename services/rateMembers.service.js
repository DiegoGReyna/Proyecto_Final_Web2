const faker = require('faker');
// const boom = require('@hapi/boom');
// const { validateData, NOTFOUND } = require('../utils');
class RateMembersService {
  constructor() {
    this.rateMembers = [];
    this.generate();
  }
  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.rateMembers.push({
        id: index,
        score: faker.datatype.number({max:5, min:1, precision: 1.00}),
        userInfo: 'localhost:3000/api/v1/users/'+index
      });
    }
  }


  async create(user, data){
    var nextIndex = this.rateMembers.length;
    const newRateMember = {
      id: nextIndex,
      ...data,
      user: user,
      userInfo: 'localhost:3000/api/v1/users/'+user
    };
    this.rateMembers.push(newRateMember);
    return newRateMember;
  }

}

module.exports = RateMembersService;
