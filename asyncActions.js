const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware= redux.applyMiddleware
const thunkMiddleware=require('redux-thunk').default
const axios=require('axios')


const initialState={
    loading:false,
    users:[],
    error:''
}

const Fetch_Users_Request = 'Fetch_Users_Request'
const Fetch_Users_Success = 'Fetch_Users_Success'
const Fetch_Users_Failure = 'Fetch_Users_Failure'

const FetchUsersRequest=()=>{
    return {
        type:Fetch_Users_Request
    }
}

const FetchUsersSuccess=(users)=>{
    return {
        type:Fetch_Users_Success,
        payload:users
    }
}

const FetchUsersFailure=(error)=>{
    return {
        type:Fetch_Users_Failure,
        payload:error
    }
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case Fetch_Users_Request:
            return {
                ...state,
                loading:true
            }
        case Fetch_Users_Success:
            return {
                loading:false,
                users:action.payload,
                error:''
            }
        case Fetch_Users_Failure:
            return {
                loading:false,
                users:[],
                error:action.payload
            }
    }
}

const fetchUsers=()=>{
    return function(dispatch){
        dispatch(FetchUsersRequest())
        axios.get('https://jsonplacehoder.typicode.com/users')
        .then(response=>{
            //response.data is the array of users
            const users=response.data.map(user=>user.id)
            dispatch(FetchUsersSuccess(users))
        })
        .catch(error =>{
            //error.message is the error description
            dispatch(FetchUsersFailure(error.message))
        })
    }
}

const store=createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers())
