import React, { useMemo, useReducer } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUsers";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중...");
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: "",
    email: "",
  },
  users: [
    {
      id: 1,
      username: "test1",
      email: "test1@gamil.com",
      active: true,
    },
    {
      id: 2,
      username: "test2",
      email: "test2@gamil.com",
      active: false,
    },
    {
      id: 3,
      username: "test3",
      email: "test3@gamil.com",
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case "CREATE_USER":
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

// Create Context API
export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

/*
function App() {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
    });
    const {username, email} = inputs;

    const onChange = useCallback(e => {
            const {name, value} = e.target;
            setInputs(inputs => ({
                ...inputs,
                [name]: value,
            }));
        },
        []
    );

    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'test1',
            email: 'test1@gamil.com',
            active: true
        },
        {
            id: 2,
            username: 'test2',
            email: 'test2@gamil.com',
            active: false
        },
        {
            id: 3,
            username: 'test3',
            email: 'test3@gamil.com',
            active: false
        }
    ]);

    const onRemove = useCallback(
        id => {
            // user.id 가 파라미터로 일치하지 않은 원소들만으로 새로운 배열을 만들어 낸다 => user.id 만 빼고 다시 만든다
            setUsers(users => users.filter(user => user.id !== id));
        },
        []);

    const nextId = useRef(4);
    const onCreate = useCallback(() => {
        const user = {
            id: nextId.current,
            username,
            email,
        };
        // 1. Spread 연산자로 배열 추가하기
        // setUsers([...users, user]);

        console.log("On Create")
        // 2. Concat 함수를 이용해 배열 추가하기
        setUsers(users => users.concat(user));

        setInputs({
            username: '',
            email: '',
        });

        nextId.current += 1;
    }, [username, email]);

    const onToggle = useCallback(id => {
            setUsers(
                users.map(user => user.id === id ? {...user, active: !user.active} : user)
            )
        },
        [users]
    );

    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
        <>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
            <div>활성 사용자 수 : {count}</div>
        </>
    );
}
*/

export default App;
