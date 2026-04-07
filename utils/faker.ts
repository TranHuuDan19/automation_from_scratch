import { faker } from '@faker-js/faker';

export function generateEmployee() {
  const firstName = faker.person.firstName();
  const middleName = faker.person.middleName();
  const lastName = faker.person.lastName();
  const employeeId = faker.string.alphanumeric(10);
  const username = faker.internet.username({
    firstName,
    lastName,
  }).slice(0, 10); 

  const password = faker.internet.password({
    length: 10,
    memorable: false,
    pattern: /[A-Za-z0-9!@#$%^&*]/,
  });

  return {
    firstName,
    middleName,
    lastName,
    employeeId,
    username,
    password,
    confirmPassword: password,
    status: 'Enabled',
  };
}