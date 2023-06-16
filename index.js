const redux= require('redux')
const reduxLogger=require('redux-logger')

const createStore=redux.createStore
const combineReducer=redux.combineReducers
const applyMiddleware=redux.applyMiddleware
const logger=reduxLogger.createLogger()

const BUY_CAKE='BUY_CAKE'
const BUY_ICECREAM='BUY_ICECREAM'

function buycake(){
    return {
        type:BUY_CAKE,
        info:'first redux action'
    }
}

function buyIceCream(){
    return {
        type:BUY_ICECREAM,
    }
}

//(previousState,action)=> newState
// const initialState={
//     numOfCake:10,
//     numOfIceCream:20
// }

const initialCakeState={
    numOfCake:10,
}

const initialIceCreamState={
    numOfIceCream:20
}

// const reducer=(state = initialState,action)=>{
//     switch(action.type){
//         case BUY_CAKE: return {
//             ...state,
//             numOfCake:state.numOfCake-1
//         }
//         case BUY_ICECREAM: return {
//             ...state,
//             numOfIceCream:state.numOfIceCream-1
//         }
//         default:return state
//     }
// }

const Cakereducer=(state = initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE: return {
            ...state,
            numOfCake:state.numOfCake-1
        }
        default:return state
    }
}

const IceCreamreducer=(state = initialIceCreamState,action)=>{
    switch(action.type){
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCream:state.numOfIceCream-1
        }
        default:return state
    }
}


const rootReducer=combineReducer({
    cake:Cakereducer,
    icecream:IceCreamreducer
})
const store=createStore(rootReducer,applyMiddleware(logger))
console.log('initial state',store.getState())
const unsubscribe= store.subscribe(()=>{})
store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()

