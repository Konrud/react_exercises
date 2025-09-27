export type LoginReducerState = {
  username: string;
  password: string;
  loading: boolean;
  error: string | null;
  isLoggedin: boolean;
};

export const LOGIN_REDUCER_ACTION_TYPE = {
  SET_USERNAME: "set_username",
  SET_PASSWORD: "set_password",
  LOGIN_START: "login_start",
  LOGIN_SUCCESS: "login_success",
  LOGIN_ERROR: "login_error",
};

export type LoginReducerAction = {
  type: (typeof LOGIN_REDUCER_ACTION_TYPE)[keyof typeof LOGIN_REDUCER_ACTION_TYPE];
  payload?: string;
};

export const loginReducerInitialState: LoginReducerState = {
  username: "",
  password: "",
  loading: false,
  error: null,
  isLoggedin: false,
};

const loginReducer = (state: LoginReducerState, action: LoginReducerAction) => {
  switch (action.type) {
    case LOGIN_REDUCER_ACTION_TYPE.LOGIN_START:
      return { ...state, loading: true, error: null, isLoggedin: false };

    case LOGIN_REDUCER_ACTION_TYPE.SET_USERNAME:
      return { ...state, username: action.payload ?? "" };

    case LOGIN_REDUCER_ACTION_TYPE.SET_PASSWORD:
      return { ...state, password: action.payload ?? "" };

    case LOGIN_REDUCER_ACTION_TYPE.LOGIN_SUCCESS:
      return { ...state, loading: false, error: null, isLoggedin: true };

    case LOGIN_REDUCER_ACTION_TYPE.LOGIN_ERROR:
      return { ...state, loading: false, error: action.payload || null, isLoggedin: false };

    default:
      return state;
  }
};

export default loginReducer;
