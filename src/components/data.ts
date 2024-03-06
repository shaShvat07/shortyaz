// * fake data's
import { faker } from '@faker-js/faker';

export function createRandomUser() {
  return {
    profile: faker.image.url(),
    image: faker.image.image(),
    lastName: faker.person.lastName(),
    age: faker.datatype.number(40),
    visits: faker.datatype.number(1000),
    date: faker.date.past({ years: 2 }),
  };
}

export const USERS = faker.helpers.multiple(createRandomUser, {
  count: 30,
});