export const initialState={
    token:null,
    premium:false
}

const reducer = (state,action) => {
    switch(action.type){
        case 'INITIALIZE_TOKEN':
            const tokenFromStorage=sessionStorage.getItem('token');
            const premiumFromStorage=sessionStorage.getItem('premium');
            return {
                token:tokenFromStorage,
                premium:premiumFromStorage
            }
        case 'SET_TOKEN':
            sessionStorage.setItem('token',action.token);
            sessionStorage.setItem('premium',action.premium);
            return {
                token:action.token,
                premium:action.premium
            }
        case 'REMOVE_TOKEN':
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('premium');
            return {
                token:null,
                premium:false
            }
        case 'SET_PREMIUM':
            sessionStorage.setItem('premium',action.premium);
            return {
                ...state,
                premium:action.premium
            }
        default:
            return state;
    }
}

export default reducer;