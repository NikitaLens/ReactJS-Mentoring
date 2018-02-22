const initialState = [
	{
		id: '1', 
        src: 'https://pp.userapi.com/c627419/v627419118/17825/YpKDnDSOMXM.jpg',
        alt: 'nikitalens',
		userId: '1',
		comment: [
			{
				id_user: '2',
				text: 'Круто'			
			},
			{
				id_user: '3',
				text: 'Огонь!!!'			
			},
			{
				id_user: '4',
				text: 'Супер'			
			}
		],
		likes: [ '1', '2', '3', '4', '5' ]
	},
	{
		id: '2',
		src: 'https://pp.userapi.com/c604828/v604828118/15e0f/GhEGPFCkgY0.jpg',
        alt: 'nikitalens',
        userId: '1',
		comment: [
			{
				id_user: '2',
				text: 'Огонь!!!'			
			},
			{
				id_user: '3',
				text: 'Cool'			
			},
			{
				id_user: '4',
				text: 'Красивое фото'			
			}
		],
		likes: [ '2', '3', '4' ]
	},
	{
		id: '3',
		src: 'https://pp.userapi.com/c631628/v631628118/44622/cC6b7IvjLTA.jpg',
        alt: 'nikitalens',
        userId: '1',
		comment: [
			{
				id: '2',
				text: 'Круто'			
			},
			{
				id: '3',
				text: 'Круто'			
			},
			{
				id: '4',
				text: 'Круто'			
			}
		],
		comment: [],
		likes: [ '2', '4' ]
	},
	{
		id: '4',
		src: 'https://pp.userapi.com/c637521/v637521118/2b177/wuxSQHbfWqo.jpg',
        alt: 'nikitalens',
        userId: '1',
		comment: [],
		likes: [ '2', '4' ]
	},
	{
		id: '5',
		src: 'https://pp.userapi.com/c636923/v636923118/1da05/WTh1_SnKtCw.jpg',
        alt: 'nikitalens',
        userId: '1',
		comment: [],
		likes: [ '2', '4' ]
	},
	{
		id: '6',
		src: 'https://pp.userapi.com/c311119/v311119118/44de/cj5XN1PLXp0.jpg',
        alt: 'nikitalens',
        userId: '1',
		comment: [],
		likes: [ '2', '4' ]
	},
	{
		id: '7',
		src: 'https://pp.userapi.com/c636122/v636122704/31d08/x0R5KUu96Q8.jpg',
        alt: 'little_dampire',
        userId: '2',
		comment: [],
		likes: [ '2', '4' ]
	},
	{
		id: '8',
		src: 'https://pp.userapi.com/c840623/v840623181/13d3d/s5Zr2Q9al2M.jpg',
        alt: 'little_dampire',
        userId: '2',
		comment: [],
		likes: [ '2', '4' ]
	},
	{
		id: '9',
		src: 'https://pp.userapi.com/c637823/v637823704/3ef26/ZUg8Fx1wN1U.jpg',
        alt: 'little_dampire',
        userId: '2',
		comment: [],
		likes: [ '2', '4' ]
	},
	{
		id: '10',
		src: 'https://pp.userapi.com/c604729/v604729997/32d1c/g1Kb9EUACGw.jpg',
        alt: 'destabilise_man',
        userId: '3',
		comment: [],
		likes: [ '2', '4' ]
    },
    
	{
		id: '11',
		src: 'https://pp.userapi.com/c836429/v836429505/c81f/FerJLEs3hfw.jpg',
        alt: 'yanuschenko',
        userId: '4',
		comment: [],
		likes: [ '2', '4' ]
	}
];

export default function photo( state = initialState, action ) {    
	// console.log(action);
	// console.log(state);
	if (action.type === 'ADD_COMMENT') {
		state.forEach( function(item) {
			if (item.id === action.comment.id_photo) {
				item.comment.push(action.comment.new_comment);
			}
		});
        return [
            ...state
        ]
	} else if (action.type === 'PUT_LIKE') {
		state.forEach( function(item) {
			if (item.id === action.like.id_photo) {
				let idDel = item.likes.indexOf(action.like.id_user);
				if ( idDel != -1 ) {
					item.likes.splice(idDel, 1);
				} else {
					item.likes.push(action.like.id_user);
				}
			}
		});
        return [
            ...state
        ]
	}
    return state;
}
