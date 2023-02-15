const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "API_CALL": {
      return {
        ...state,
        loading: true,
      };
    }
    case "REGISTER_USER": {
      return {
        ...state,
        _id: payload._id,
        token: payload.token,
        email: payload.email,
        name: payload.name,
        loading: false,
      };
    }
    case "EMAIL": {
      return {
        ...state,
        email: payload.email,
        password: payload.password,
        loading: false,
      };
    }
    case "ERROR": {
      return {
        ...state,
        errorMessage: payload.value,
        loading: false,
        error: true,
      };
    }
    case "C_ERROR": {
      return {
        ...state,
        errorMessage: payload.errorMessage,
        error: false,
      };
    }
    case "LOGIN": {
      return {
        ...state,
        _id: payload._id,
        token: payload.token,
        email: payload.email,
        password: payload.password,
        loading: false,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: null,
        _id: "",
        token: "",
        email: "",
        password: "",
        loading: false,
      };
    }
    case "SET_ROOM": {
      return {
        ...state,
        room: payload.room,
      };
    }
    case "GET_MESSAGE":
      let newState = {
        ...state,
        message: [
          ...state.message,
          {
            id: payload.id,
            text: payload.text,
            user: { name: payload.name },
          },
        ],
      };
      return newState;
    case "ADD_MESSAGE":
      let updatedState = {
        ...state,
        message: [
          ...state.message,
          {
            id: payload.id,
            text: payload.text,
            user: { name: payload.name },
          },
        ],
      };
      return updatedState;
      case 'CLEAR_MESSAGE':
        return {
            ...state,
            message:[{
              id: '1',
            text: 'start',
            user: { name:'Start' },
            }]
        }

    default:
      return state;
  }
};

export default userReducer;
