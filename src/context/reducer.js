export const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTRATION':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'TOKEN':
      const newToken = localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: newToken,
      };

    default:
      return state;
  }
};

export default userReducer;
