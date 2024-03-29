const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.deleteMany();
    await database.category.createMany({
      data: [
        { name: "Computer Science and Engineering" },
        { name: "Information Science Engineering" },
        { name: "Electronics and Communication Engineering" },
        { name: "Electrical and Electronical Engineering" },
        { name: "Mechanical Engineering" },
        { name: "Civil Engineering" },
        { name: "AIMl Engineering" },
      ]
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();