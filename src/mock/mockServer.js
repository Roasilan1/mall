import Mock from 'mockjs';

import banners from "./banners.json";
import floors from "./floors.json";

let data = { code: 200 };

Mock.mock("/mock/banners", {...data, data: banners });
Mock.mock("/mock/floors", {...data, data: floors });