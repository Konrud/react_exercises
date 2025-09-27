import { useReducer, type ChangeEvent } from "react";
import "./ManagingComplexStateWithUseReducer.css";
import loginReducer, {
  LOGIN_REDUCER_ACTION_TYPE,
  loginReducerInitialState,
} from "./LoginReducer";

/*
Practise:
* Replace multiple useState calls with a single useReducer

* Use actions to update state in a predictable way

* Structure state logic in one central reducer
*/

const INPUT_NAMES = {
  USERNAME: "username",
  PASSWORD: "password",
} as const;

const INPUT_FIELD_ACTION_TYPE_MAP = {
  [INPUT_NAMES.USERNAME]: LOGIN_REDUCER_ACTION_TYPE.SET_USERNAME,
  [INPUT_NAMES.PASSWORD]: LOGIN_REDUCER_ACTION_TYPE.SET_PASSWORD,
} as const;

/*--- As additional option ---*/
// type FieldName = (typeof INPUT_NAMES)[keyof typeof INPUT_NAMES];

// type FieldActionType =
//   | typeof LOGIN_REDUCER_ACTION_TYPE.SET_USERNAME
//   | typeof LOGIN_REDUCER_ACTION_TYPE.SET_PASSWORD;

// const INPUT_FIELD_ACTION_TYPE_MAP1: Record<FieldName, FieldActionType> = {
//   username: LOGIN_REDUCER_ACTION_TYPE.SET_USERNAME,
//   password: LOGIN_REDUCER_ACTION_TYPE.SET_PASSWORD,
// } as const;
/*--------------------------- */

export const ManagingComplexStateWithUseReducer: React.FC = () => {
  const [state, dispatch] = useReducer(loginReducer, loginReducerInitialState);

  const handleLogin = async () => {
    dispatch({ type: LOGIN_REDUCER_ACTION_TYPE.LOGIN_START });

    // Fake async login
    setTimeout(() => {
      if (state.username === "admin" && state.password === "123") {
        dispatch({ type: LOGIN_REDUCER_ACTION_TYPE.LOGIN_SUCCESS });
      } else {
        dispatch({
          type: LOGIN_REDUCER_ACTION_TYPE.LOGIN_ERROR,
          payload: "Invalid credentials",
        });
      }
    }, 3 * 1000);
  };

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const currentTarget = e.currentTarget;
  //   const inputName = currentTarget.name;
  //   const inputValue = currentTarget.value;
  //   let dispatchType;

  //   if (inputName === INPUT_NAMES.USERNAME) {
  //     dispatchType = LOGIN_REDUCER_ACTION_TYPE.SET_USERNAME;
  //   } else if (inputName === INPUT_NAMES.PASSWORD) {
  //     dispatchType = LOGIN_REDUCER_ACTION_TYPE.SET_PASSWORD;
  //   }

  //   if (!dispatchType) {
  //     return;
  //   }

  //   dispatch({ type: dispatchType, payload: inputValue });
  // };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentTarget = e.currentTarget;
    const inputName = currentTarget.name;
    const inputValue = currentTarget.value;
    /* Advantages:
        - O(1) lookup vs O(n) conditional chain
        - Declarative mapping between fields and actions
        - Type safety through const assertions
        - Easy extensibility - new fields require only map entries */
    const actionType =
      INPUT_FIELD_ACTION_TYPE_MAP[inputName as keyof typeof INPUT_FIELD_ACTION_TYPE_MAP];

    if (actionType) {
      dispatch({ type: actionType, payload: inputValue });
    }
  };

  return (
    <div className="l-state-with-usereducer-container">
      <h2 className="c-state-with-usereducer-title">Managing Complex State With useReducer</h2>

      <div>
        <h3>Login Form</h3>
        <div>
          <label htmlFor={INPUT_NAMES.USERNAME}>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={state.username}
            onChange={handleInputChange}
            name={INPUT_NAMES.USERNAME}
            id={INPUT_NAMES.USERNAME}
          />
        </div>
        <div>
          <label htmlFor={INPUT_NAMES.PASSWORD}>Password</label>
          <input
            type="text"
            placeholder="Password"
            value={state.password}
            onChange={handleInputChange}
            name={INPUT_NAMES.PASSWORD}
            id={INPUT_NAMES.PASSWORD}
          />
        </div>

        <div>
          <button onClick={handleLogin} disabled={state.loading} type="button">
            {state.loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <div>{state.error && <p>{state.error}</p>}</div>
        <div>
          {!state.error && state.isLoggedin && <p>You've been logged in successfully!</p>}
        </div>
      </div>
    </div>
  );
};

export default ManagingComplexStateWithUseReducer;
