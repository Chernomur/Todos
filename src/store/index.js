import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import constants from "utils/constants";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: constants.TASKS_STORAGE_NAME,
  storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
