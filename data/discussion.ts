import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

// random int between 0 and max
const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const avatars3 = [
  faker.image.avatar(),
  faker.image.avatar(),
  faker.image.avatar(),
];

export const faksePost = (i: number) => ({
  id: i,
  postedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  body: faker.lorem.sentence(getRandomInt(100) + 1),
  author: {
    name: faker.name.fullName(),
    image: avatars3[getRandomInt(3)],
  },
});

export const post100 = Array.from({ length: 100 }, (_, i) => faksePost(i));
