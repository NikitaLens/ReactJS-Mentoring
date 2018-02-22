const initialState = [
	{
        id: '1',
        nick: 'nikitalens',
        password: '',
        avatar: 'https://pp.userapi.com/c631628/v631628118/44622/cC6b7IvjLTA.jpg',
        fullname: 'Nikita Lenski',
        email: 'nikita.lensckij@yandex.ru',
        firstName: 'Nikita',
        lastName: 'Lenski',
        link: 'vk.com/nikitalens',
        photos: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        followers: [2, 3, 4, 5],
        following: [2, 3, 4]
	},
	{
        id: '2',
        nick: 'little_dampire',
        password: '',
        avatar: 'https://pp.userapi.com/c637823/v637823704/3ef26/ZUg8Fx1wN1U.jpg',
        fullname: 'Marina Muracheva',
        email: 'marina.muracheva@gmail.com',
        firstName: 'Marina',
        lastName: 'Muracheva',
        link: 'vk.com/marina_rinaldi',
        photos: [7, 8, 9],
        followers: [2, 3, 4, 5],
        following: [2, 3, 4]
    },
    {
        id: '3',
        nick: 'destabilise_man',
        password: '',
        avatar: 'https://pp.userapi.com/c834402/v834402311/67758/-5imLP8ws8k.jpg',
        fullname: 'ΔNDRΞ₩ DΞHTIΔRYΘV',
        email: 'destabilise_man@gmail.com',
        firstName: 'ΔNDRΞ₩',
        lastName: 'DΞHTIΔRYΘV',
        link: 'vk.com/andrewdehtiaryov',
        photos: [10],
        followers: [2, 3, 4, 5],
        following: [2, 3, 4]
	},
    {
        id: '4',
        nick: 'yanuschenko',
        password: '',
        avatar: 'https://pp.userapi.com/c837235/v837235505/30dbe/uIFgZhtrrBU.jpg',
        fullname: 'Evgeniy Yanuschenko',
        email: 'yanuschenko@gmail.com',
        firstName: 'Evgeniy',
        lastName: 'Yanuschenko',
        link: 'https://vk.com/id88989505',
        photos: [11],
        followers: [2, 3, 4, 5],
        following: [2, 3, 4]
	},
    {
        id: '5',
        nick: 'anonimus',
        password: '',
        avatar: 'https://png.icons8.com/color/1600/anonymous-mask',
        fullname: 'Anonim Anonim',
        email: 'anonimus@gmail.com',
        firstName: 'Anonim',
        lastName: 'Anonim',
        link: 'https://vk.com/anonim',
        photos: [],
        followers: [2, 3, 4, 5],
        following: []
	}
];

export default function user( state = initialState, action ) {    
	// console.log(action);
	// console.log(state);
	if (action.type === 'LOG_IN') {
		state.forEach( function(item) {
			if (item.nick === action.user.username) {
			    console.log('log in success');
			} else console.log('log in failed');
		});
        return [
            ...state
        ]
	} else if (action.type === 'SIGN_UP') {
        let new_user = {
            id: Date.now().toString(),
            nick: action.user.username,
            password: action.user.password,
            avatar: '',
            fullname: action.user.fullname,
            email: action.user.email,
            link: '',
            photos: [],
            followers: [],
            following: []
        }	
        return [
            ...state,
            new_user
        ]
	}
    return state;
}