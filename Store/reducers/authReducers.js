import actionTypes from '../Constant/Constant'

const INITIAL_STATE = {
    USERNAME: null,
    UID: null,
    USER: null,
    CLINICS: null,
    TOKENREQUEST: null,
    PROFILEPIC: null,
    PROFILENAME: null,
    ALLUSER: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USERNAME':
            return ({
                ...states,
                USERNAME: action.payload
            })
        case 'UID':
            return ({
                ...states,
                UID: action.payload
            })
        case 'USER':
            return ({
                ...states,
                USER: action.payload
            })
        case 'ALLUSER':
            return ({
                ...states,
                ALLUSER: action.payload
            })
        case 'CLINICS':
            return ({
                ...states,
                CLINICS: action.payload
            })
        case 'TOKENREQUEST':
            return ({
                ...states,
                TOKENREQUEST: action.payload
            })
        case 'PROFILEPIC':
            return ({
                ...states,
                PROFILEPIC: action.payload
            })
        case 'PROFILENAME':
            return ({
                ...states,
                PROFILENAME: action.payload
            })
        default:
            return states;
    }
}