// The state here means the proprty 'members' of main store, it doesn't mean the main store
// beacause we use the recuderCombiner
const member = (state = [], action) => {
    let members = action.members;
    let memberState = state;
    switch (action.type) {
        case 'MEMBER_FIND':
            return members;
        case 'MEMBER_INSERT':
            let member = members.shift();
            return [...memberState, member];
        default:
            return memberState;
    }
};

export default member;