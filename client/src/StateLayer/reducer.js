export const initialState = {
    user: null,
    isAuthenticated: false,
    messages: null,
    loadingMessages: false,
    selectedUser: null,
    userListOffsetHeight: 0
};

export function reducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }

        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }

        case 'SET_MESSAGES':
            return {
                ...state,
                messages: action.payload
            }

        case 'SET_LOADING_MESSAGES':
            return {
                ...state,
                loadingMessages: action.payload
            }

        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, { ...action.payload }]
            }

        case 'SET_SELECTED_USER':
            return {
                ...state,
                selectedUser: action.payload
            }

        case 'SET_USER_LIST_OFFSET_HEIGHT':
            return {
                ...state,
                userListOffsetHeight: action.payload
            }

        case 'UPDATE_MESSAGE': {
            console.log(action)
            return {
                ...state,
                messages: state.messages.map(message => message.id === action.payload.id ? { ...action.payload } : message)
            }
        }
        default:
            return state;
    }
}