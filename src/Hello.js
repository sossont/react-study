import React from 'react';

function Hello({color,name, isSpecial}){
    return <div style={{color: color}}>
        { isSpecial && <b>*</b>}
        하이염 {name}</div>
}


Hello.defaultProps = {
    name: '이름없음',
    color: 'blue'
}

export default Hello;