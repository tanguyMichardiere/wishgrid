import { PrismaClient } from "@prisma/client";
import { log } from "next-axiom";

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
      outFriendRequests: { connect: [{ id: tanguy.id }, { id: noli.id }] },
    },
  });

  log.info("success", { tanguy, noli, thed });
}

main()
  .then(async function () {
    await prisma.$disconnect();
  })
  .catch(async function (e) {
    await prisma.$disconnect();
    throw e;
  });
