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
        message:"",
        name:"",
        room: "",
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
            date: payload.date,
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
            user: payload.name,
            date: payload.date,
          },
        ],
      };
      return updatedState;
    case "CLEAR_MESSAGE":
      return {
        ...state,
        message: [],
      };
    case "AddActiveRooms":
      return {
        ...state,
        activeRooms: [...state.activeRooms, payload.activeRooms],
      };
     case "DELETE_ACTIVE_ROOM":
      return{
        ...state,
        activeRooms: state.activeRooms.filter(t=>t !==payload.room),
      } 
      case "SET_ACTIVE_ROOM":
        return{
          ...state,
          activeRooms: payload.activeRooms
        }
        case "SET_ROOM_LIST":
          return{
            ...state,
            roomsList: payload.roomsList
          }
          case "ADD_ROOM_LIST":
            return{
              ...state,
              roomsList: [...state.roomsList, payload.roomsList]
            }
    default:
      return state;
  }
};

export default userReducer;
