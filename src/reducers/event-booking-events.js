const eventAddedToCalendar = (state, action) => {
    if (state === undefined){
        return {
            cartItems: [],
            orderTotal: 0
        }
    }
    switch (action.type) {
        case 'EVENT_ADDED_TO_CALENDAR':
            console.log("ACTION - - ", action.payload);
            console.log("EVENTS - - ", state.events);
            return state.events.push(action.payload)


        case 'EVENT_REMOVE_FROM_CALENDAR':
        // return updateOrder(state, action.payload, -1)

        /* case 'ALL_BOOKS_REMOVE_FROM_CART':
             const deletedBook = state.shoppingCart.cartItems.find(({id}) => id === action.payload)
             return updateOrder(state, action.payload, -deletedBook.count)*/
        default:
            return state.eventBookingList
    }
}

export default eventAddedToCalendar