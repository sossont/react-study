import React, {useContext} from 'react';
import {UserDispatch} from "./App";


const User = React.memo(function User({user}) {
    const dispatch = useContext(UserDispatch);
    return (
        <div>
            <b
                style={{
                    cursor: 'pointer', // 마우스를 올렸을 때 커서가 손가락 모양으로 변한다.
                    color: user.active ? 'green' : 'black'
                }}
                onClick={() => {
                    dispatch({type: 'TOGGLE_USER', id: user.id});
                }}
            >
                {user.username}
            </b>
            <span>{user.email}</span>
            <button onClick={() => {
                dispatch({type: 'REMOVE_USER', id: user.id});
            }}>삭제
            </button>
        </div>
    );
});

function UserList({users}) {

    return (
        <div>
            {users.map(user => (
                <User
                    user={user}
                    key={user.id}
                />
            ))}
        </div>
    );
}

export default React.memo(UserList);