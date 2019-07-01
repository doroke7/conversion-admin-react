// This function is a real action
const _find = (members) => {
    return {
        type: 'MEMBER_FIND',
        members: members
    };
};

// This function is a real action
const _insert = (members) => {
    return {
        type: 'MEMBER_INSERT',
        members: members
    };
};

// The methods of this class are a wrapped actions
class Member {
    find () {
        return (dispatch) => {
            return window.fetch('http://fea.jkpot.com:3002/api/member', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'text/plain'
                },
                cache: 'no-cache',
                mode: 'cors',
                credentials: 'include'
            }).then((res) => {
                return res.json();
            }).then((resJson) => {
                let members = resJson.data;
                dispatch(_find(members));
            });
        };
    }

    insert (members) {
        return (dispatch) => {
            let member = members.shift();
            return window.fetch('http://fea.jkpot.com:3002/api/member', {
                method: 'POST',
                body: JSON.stringify({
                    ...member
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                return res.json();
            }).then((resJson) => {
                let members = resJson.data;
                dispatch(_insert(members));
            });
        };
    }
}

export default new Member();