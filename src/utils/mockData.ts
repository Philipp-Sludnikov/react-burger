import { TWebsocketPayload } from "../services/types/action-types/websocket-action-types";
import { TIngredient, TOrderInfo } from "../services/types/burger-ingredients-types";

export const ingredients: Array<TIngredient> = [
  {
      _id:'60d3b41abdacab0026a733c6',
      name:'Краторная булка N-200i',
      type:'bun',
      proteins:80,
      fat:24,
      carbohydrates:53,
      calories:420,
      price:1255,
      image:'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile:'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large:'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v:0,
      id: ''
  },
  {
      _id:'60d3b41abdacab0026a733cd',
      name:'Соус фирменный Space Sauce',
      type:'sauce',
      proteins:50,
      fat:22,
      carbohydrates:11,
      calories:14,
      price:80,
      image:'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile:'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large:'https://code.s3.yandex.net/react/code/sauce-04-large.png',
      __v:0,
      id: ''
  },
  {
      _id:'60d3b41abdacab0026a733cc',
      name:'Соус Spicy-X',
      type:'sauce',
      proteins:30,
      fat:20,
      carbohydrates:40,
      calories:30,
      price:90,
      image:'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile:'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large:'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      __v:0,
      id: ''
  }
];
export const constructorIngredients: Array<TIngredient> = [
  {
      _id:'60d3b41abdacab0026a733c6',
      name:'Краторная булка N-200i',
      type:'bun',
      proteins:80,
      fat:24,
      carbohydrates:53,
      calories:420,
      price:1255,
      image:'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile:'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large:'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v:0,
      id: 'b28fa9c88094a'
  },
  {
      _id:'60d3b41abdacab0026a733cd',
      name:'Соус фирменный Space Sauce',
      type:'sauce',
      proteins:50,
      fat:22,
      carbohydrates:11,
      calories:14,
      price:80,
      image:'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile:'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large:'https://code.s3.yandex.net/react/code/sauce-04-large.png',
      __v:0,
      id: '4094e9a9f9f43'
  },
  {
      _id:'60d3b41abdacab0026a733cc',
      name:'Соус Spicy-X',
      type:'sauce',
      proteins:30,
      fat:20,
      carbohydrates:40,
      calories:30,
      price:90,
      image:'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile:'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large:'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      __v:0,
      id: '5bb1246e32613'
  }
];

export const orderInfoResponse: TOrderInfo = {
  ingredients: [
      {
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80,
        type: "bun",
        __v: 0,
        _id: "60d3b41abdacab0026a733c6",
        id: ''
      },
      {
        calories: 14,
        carbohydrates: 11,
        fat: 22,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        name: "Соус фирменный Space Sauce",
        price: 80,
        proteins: 50,
        type: "sauce",
        __v: 0,
        _id: "60d3b41abdacab0026a733cd",
        id: ''
      },
      {
        calories: 30,
        carbohydrates: 40,
        fat: 20,
        image: "https://code.s3.yandex.net/react/code/sauce-02.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        name: "Соус Spicy-X",
        price: 90,
        proteins: 30,
        type: "sauce",
        __v: 0,
        _id: "60d3b41abdacab0026a733cc",
        id: ''
      },
      {
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80,
        type: "bun",
        __v: 0,
        _id: "60d3b41abdacab0026a733c6",
        id: ''
      }
  ],
  _id: '6257dd5d1a3b2c001bd003f7',
  owner: {
    createdAt: "2022-02-27T20:01:11.852Z",
    email: "feel2036@yandex.ru",
    name: "Филипп",
    updatedAt: "2022-04-09T18:06:35.604Z"
  },
  status: 'done',
  name: 'Краторный space spicy бургер',
  createdAt: "2022-04-14T08:37:49.621Z",
  updatedAt: "2022-04-14T08:37:49.783Z",
  number: 13585,
  price: 2680,
} 

export const wsMessagePayload: TWebsocketPayload = {
  orders: [{
    createdAt: '2022-04-14T13:25:24.848Z',
    ingredients: ["60d3b41abdacab0026a733ce","60d3b41abdacab0026a733ce","60d3b41abdacab0026a733ce","60d3b41abdacab0026a733c9","60d3b41abdacab0026a733c9","60d3b41abdacab0026a733c6"],
    name: '"Краторный традиционный-галактический бессмертный бургер"',
    number: 13592,
    status: 'done',
    updatedAt: '2022-04-14T13:25:25.019Z',
    _id: '625820c41a3b2c001bd004e2'
  }],
  total: 13505,
  totalToday: 48
}