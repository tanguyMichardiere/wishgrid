import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tanguy = await prisma.user.upsert({
    where: { email: "tanguy@mail.com" },
    update: {},
    create: {
      name: "Tanguy",
      email: "tanguy@mail.com",
    },
  });
  const noli = await prisma.user.upsert({
    where: { email: "noli@mail.com" },
    update: {},
    create: {
      name: "Noli",
      email: "noli@mail.com",
      friends: { connect: { id: tanguy.id } },
      outFriends: { connect: { id: tanguy.id } },
    },
  });
  const thed = await prisma.user.upsert({
    where: { email: "thed@mail.com" },
    update: {},
    create: {
      name: "Thed",
      email: "thed@mail.com",
      friends: { connect: [{ id: tanguy.id }, { id: noli.id }] },
      outFriends: { connect: [{ id: tanguy.id }, { id: noli.id }] },
    },
  });
  const maxence = await prisma.user.upsert({
    where: { email: "maxence@mail.com" },
    update: {},
    create: {
      name: "Maxence",
      email: "maxence@mail.com",
      outFriendRequests: { connect: [{ id: tanguy.id }, { id: noli.id }] },
    },
  });
  await prisma.user.upsert({
    where: { email: "claire@mail.com" },
    update: {},
    create: {
      name: "Claire",
      email: "claire@mail.com",
      friends: { connect: { id: maxence.id } },
      outFriends: { connect: { id: maxence.id } },
      outFriendRequests: { connect: [{ id: noli.id }, { id: thed.id }] },
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
