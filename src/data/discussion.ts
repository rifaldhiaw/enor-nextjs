import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

// random int between 0 and max
const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const avatar = faker.image.avatar();

export const makeFakePost = (i: number, body?: string) => ({
  id: i.toString(),
  postedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  body: body ?? faker.lorem.sentence(getRandomInt(30) + 1),
  author: {
    name: faker.name.fullName(),
    image: avatar,
  },
});

export type Post = ReturnType<typeof makeFakePost>;

export const post100 = Array.from({ length: 100 }, (_, i) => makeFakePost(i));
