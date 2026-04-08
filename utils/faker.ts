let fakerInstance: any;

async function getFaker() {
  if (!fakerInstance) {
    const mod = await import('@faker-js/faker');
    fakerInstance = mod.faker;
  }
  return fakerInstance;
}

export async function generateEmployeeInfo() {
  const faker = await getFaker();

  const firstName = await faker.person.firstName();
  const middleName = await  faker.person.middleName();
  const lastName = await  faker.person.lastName();
  const employeeId = await  faker.string.alphanumeric(10);

  const username = await  faker.internet.username({
    firstName,
    lastName,
  }).slice(0, 10); 

  const password = await 
    faker.internet.password({
      length: 8,
      memorable: false,
      pattern: /[A-Za-z0-9!@#$%^&*]/,
    }) + 'a1';

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