const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = [
  {
    '_id' : ObjectId('5a940d5c5fe203001064f81f'),
    'id': 1,
    'login': 'nikitalens',
    'password': '6f1bbb7af7250fec48cda1ccc6d3d47561ced619f55de13e843d28ba026e582e',
    'avatar': 'https://pp.userapi.com/c631628/v631628118/44622/cC6b7IvjLTA.jpg',
    'email': 'nikita.lensckij@yandex.ru',
    'firstName': 'Nikita',
    'lastName': 'Lenski',
    'link': 'https://vk.com/nikitalens',
    'followers': [2, 3, 4, 5],
    'following': [2, 3, 4, 5]
  },
  {
    '_id' : ObjectId('5a940d5c5fe203001064f820'),
    'id': 2,
    'login': 'little_dampire',
    'password': '6f1bbb7af7250fec48cda1ccc6d3d47561ced619f55de13e843d28ba026e582e',
    'avatar': 'https://pp.userapi.com/c637823/v637823704/3ef26/ZUg8Fx1wN1U.jpg',
    'email': 'marina.muracheva@gmail.com',
    'firstName': 'Marina',
    'lastName': 'Muracheva',
    'link': 'https://vk.com/marina_rinaldi',
    'followers': [1, 3, 4, 5],
    'following': [1, 3, 4, 5]
  },
  {
    '_id': ObjectId('5a940d5c5fe203001064f821'),
    'id': 3,
    'login': 'destabilise_man',
    'password': '6f1bbb7af7250fec48cda1ccc6d3d47561ced619f55de13e843d28ba026e582e',
    'avatar': 'https://pp.userapi.com/c834402/v834402311/67758/-5imLP8ws8k.jpg',
    'email': 'destabilise_man@gmail.com',
    'firstName': 'ΔNDRΞ₩',
    'lastName': 'DΞHTIΔRYΘV',
    'link': 'https://vk.com/andrewdehtiaryov',
    'followers': [1, 2, 4, 5],
    'following': [1, 2, 4, 5]
  },
  {
    '_id': ObjectId('5a940d5c5fe203001064f822'),
    'id': 4,
    'login': 'yanuschenko',
    'password': '6f1bbb7af7250fec48cda1ccc6d3d47561ced619f55de13e843d28ba026e582e',
    'avatar': 'https://pp.userapi.com/c837235/v837235505/30dbe/uIFgZhtrrBU.jpg',
    'email': 'yanuschenko@gmail.com',
    'firstName': 'Evgeniy',
    'lastName': 'Yanuschenko',
    'link': 'https://vk.com/id88989505',
    'followers': [1, 2, 3, 5],
    'following': [1, 2, 3, 5]
  },
  {
    '_id': ObjectId('5a940d5c5fe203001064f823'),
    'id': 5,
    'login': 'anonimus',
    'password': '6f1bbb7af7250fec48cda1ccc6d3d47561ced619f55de13e843d28ba026e582e',
    'avatar': 'https://png.icons8.com/color/1600/anonymous-mask',
    'email': 'anonimus@gmail.com',
    'firstName': 'Anonim',
    'lastName': 'Anonim',
    'link': 'https://vk.com/anonim',
    'followers': [1, 2, 3, 4],
    'following': [1, 2, 3, 4]
  }
];
