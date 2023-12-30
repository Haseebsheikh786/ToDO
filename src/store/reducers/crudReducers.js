const initialState = {
    users: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETAllUsers":
            return {
                ...state,
                users: action.payload,
            };
        case "AddUser":
            return {
                ...state,
                users: [...state.users, action.payload],
            };

        default:
            return state;
    }
};
export default userReducer;
