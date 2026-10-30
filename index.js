const sequelize = require("./config/database");
const Car = require("./models/Car");

async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    await Car.destroy({ where: {} });

    await Car.bulkCreate([
      {
        brand: "Toyota",
        model: "Camry",
        year: 2022,
        price: 3250000,
        isAvailable: true
      },
      {
        brand: "BMW",
        model: "X5",
        year: 2021,
        price: 6850000,
        isAvailable: false
      },
      {
        brand: "Lada",
        model: "Vesta",
        year: 2023,
        price: 1650000,
        isAvailable: true
      }
    ]);

    const cars = await Car.findAll({ raw: true });

    console.log("Список автомобилей:");
    console.table(cars);
  } catch (error) {
    console.error(error);
  } finally {
    await sequelize.close();
  }
}

main();
