import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const tanguy = await prisma.user.create({
    data: {
      name: "Tanguy",
      email: "tanguy@mail.com",
    },
  });
  const noli = await prisma.user.create({
    data: {
      name: "Noli",
      email: "noli@mail.com",
      friends: { connect: { id: tanguy.id } },
      outFriends: { connect: { id: tanguy.id } },
    },
  });
  const thed = await prisma.user.create({
    data: {
      name: "Thed",
      email: "thed@mail.com",
      friends: { connect: [{ id: tanguy.id }, { id: noli.id }] },
      outFriends: { connect: [{ id: tanguy.id }, { id: noli.id }] },
    },
  });
  const maxence = await prisma.user.create({
    data: {
      name: "Maxence",
      email: "maxence@mail.com",
      outFriendRequests: { connect: [{ id: tanguy.id }, { id: noli.id }] },
    },
  });
  await prisma.user.create({
    data: {
      name: "Claire",
      email: "claire@mail.com",
      friends: { connect: { id: maxence.id } },
      outFriends: { connect: { id: maxence.id } },
      outFriendRequests: { connect: [{ id: tanguy.id }, { id: noli.id }, { id: thed.id }] },
    },
  });
}

main()
  .then(async function () {
    await prisma.$disconnect();
  })
  .catch(async function (e) {
    await prisma.$disconnect();
    throw e;
  });
