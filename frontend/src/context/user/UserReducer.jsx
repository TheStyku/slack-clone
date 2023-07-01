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
        errorMessage: payload.message,
        loading: false,
        error: true,
      };
    }
    case "C_ERROR": {
      return {
        ...state,
        errorMessage: payload.message,
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
            user: payload.name,
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
            user:  payload.name ,
          },
        ],
      };
      return updatedState;
      case 'CLEAR_MESSAGE':
        return {
            ...state,
            message:[]
        }

    default:
      return state;
  }
};

export default userReducer;
