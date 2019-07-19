import { createStore, combineReducers, Reducer, Store, applyMiddleware } from "redux";
import peladaReducer, { PeladaState, PeladaKey } from "./redux/pelada";
import { AsyncStorage } from "react-native";
import playerReducer, { PlayerKey, PlayerState } from "./redux/player";
import createSagaMiddleware from "@redux-saga/core";
import sagas from "./sagas";

const initialState = {}

export interface ApplicationState {
  pelada: PeladaState,
  player: PlayerState
}

const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  pelada: peladaReducer,
  player: playerReducer
})

const sagaMiddleware = createSagaMiddleware()

const store: Store<ApplicationState> = createStore(
  reducers,
  initialState,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(sagas)

export default store