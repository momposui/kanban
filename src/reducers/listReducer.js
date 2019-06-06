import { CONSTANTS } from "../actions";
//localStorage.clear('kanban_list_array');
function uuid() {
    function randomDigit() {
        if (crypto && crypto.getRandomValues) {
            var rands = new Uint8Array(1);
            crypto.getRandomValues(rands);
            return (rands[0] % 16).toString(16);
        } else {
            return ((Math.random() * 16) | 0).toString(16);
        }
    }
    var crypto = window.crypto || window.msCrypto;
    return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
}


let listID = uuid();
let cardID = uuid();

let initialState= [
    {
        title: "Список дел",
        id:`list-${uuid()}`,
        cards: [

        ]
    },

    {
        title: "В процессе",
        id:`list-${uuid()}`,
        cards: [

        ]},
    {
        title: "Завершено",
        id:`list-${uuid()}`,
        cards: [
        ]
    }
];
let lc = JSON.parse(localStorage.getItem("kanban_list_array"))
if(lc != null)
{
    initialState = lc;
}
else
{
    localStorage.setItem("kanban_list_array", JSON.stringify(initialState));
}

const listsReducer = (state = initialState, action) => {
    switch(action.type) {

        case CONSTANTS.DELETE_LIST:
        

        var filtered = state.filter(function(value, index, arr){

            return value.id != action.payload;
        
        });
        localStorage.setItem("kanban_list_array", JSON.stringify(filtered));

        return [...filtered];

        case CONSTANTS.DELETE_CARD:

        let new_filtered = [];
        for(let i = 0; i < state.length; i++)
        {
            let list = state[i];
            let currentList = {
                title: list.title,
                cards: [],
                id: list.id
            }
            for(let j = 0; j < state[i].cards.length; j++)
            {
                let card = state[i].cards[j];
                if(card.id != action.payload.cardId)
                {
                    currentList.cards.push(card); 
                }
            }
            new_filtered.push(currentList);
        }
        localStorage.setItem("kanban_list_array", JSON.stringify(new_filtered));

        return [...new_filtered];


        case CONSTANTS.ADD_LIST:
        const newList = {
            title: action.payload,
            cards: [],
            id: `list-${listID}`
        }
        listID = uuid();
        localStorage.setItem("kanban_list_array", JSON.stringify([...state, newList]));

        return [...state, newList];

        case CONSTANTS.ADD_CARD: {
        const newCard = {
            text: action.payload.text,
            id: `card-${cardID}`,
            list_id: action.payload.listID
        };
        cardID = uuid();
        
        const newState = state.map(list => {
            if(list.id === action.payload.listID) {
                return {
                    ...list,
                    cards: [...list.cards, newCard]
                };
            } else {
                return list
            }
        });
        localStorage.setItem("kanban_list_array", JSON.stringify(newState));
        return newState;
        }
        case CONSTANTS.DRAG_HAPPENED:

        const {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexEnd,
            droppableIndexStart,
            draggableId,
            type
        } = action.payload;
        const newState = [...state];

        // dragging lists around
        if (type === "list") {
            const list = newState.splice(droppableIndexStart, 1);
            newState.splice(droppableIndexEnd, 0, ...list);
        }
        else
        {
            // vin the same list
            if(droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
            }
            // other list

            if (droppableIdStart !== droppableIdEnd) {
                // find the list where drag happened
                const listStart = state.find(list=> droppableIdStart ===list.id);
                
                // pull out the card from the list 
                const card = listStart.cards.splice(droppableIndexStart, 1);

                //find the list where drag ended
                const listEnd = state.find(list => droppableIdEnd === list.id);

                //put the card in the new list 
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }
        }



        localStorage.setItem("kanban_list_array", JSON.stringify(newState));

        return newState;

    default:
        return state;
    }
};

export default listsReducer;