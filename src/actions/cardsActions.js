import { CONSTANTS } from "../actions"; 
 
 
 export const addCard = (listID, text, color,date) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: { text, listID, date,color }
    };
};

export const deleteCard = (cardId) => {

    return {
        type: CONSTANTS.DELETE_CARD,
        payload: {cardId }
    };
};