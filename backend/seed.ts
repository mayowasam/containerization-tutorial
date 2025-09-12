import prisma from "./connection.ts";

export async function main() {
  // Clear tables
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice Johnson',
      password: 'password123', // Hash this in real apps
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob Smith',
      password: 'password456',
    },
  });

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Getting Started with Prisma',
      content: 'This is a post about Prisma ORM...',
      published: true,
      author: { connect: { id: alice.id } },
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Advanced PostgreSQL Features',
      content: 'Exploring advanced PostgreSQL features...',
      published: true,
      author: { connect: { id: bob.id } },
    },
  });

  // Create comments
  await prisma.comment.create({
    data: {
      content: 'Great post! I learned a lot.',
      author: { connect: { id: bob.id } },
      post: { connect: { id: post1.id } },
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Thanks for sharing!',
      author: { connect: { id: alice.id } },
      post: { connect: { id: post2.id } },
    },
  });

  console.log('✅ Database has been seeded!');
}
