import { createStore, applyMiddleware } from "redux";
import { persistCombineReducers, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { reducer as toastr } from "react-redux-toastr";
import thunk from "redux-thunk";
// import logger from 'redux-logger';
import { createBrowserHistory } from "history";
import { routerMiddleware } from "react-router-redux";

import eventReducer from "./views/Events/eventReducer";
import pdfViewerReducer from "./components/pdfViewer/reducer";
import loginReducer from "./views/Login/reducer";
import spinnerStatusReducer from "./spinnerStore/reducer";
import curriculumReducer from "./views/Curriculum/reducer";
import categoryReducer from "./views/Category/reducer";
import categoryReducerForSubject from "./views/CategoryItem/reducer";
import carouselReducer from "./components/carousel/reducer";
import modalReducer from "./shared/components/modalpopup/modalReducer";
import studentReducer from "./views/Student/reducer";
import homeReducer from "./views/Home/reducer";
import teacherDetailsReducer from "./views/Teacher/teacher-details/teacher-details.reducer";
import searchTeacherReducer from "./views/Student/SearchTeacher/searchTeacherReducer";
import BlogDetailsREducer from './views/Blog/create/reducer';
import videoReducer from "./views/Video/reducer";
import notificationReducer from "./views/Teacher/Notification/notificationReducer";
import notifDetils from "./views/Notification/reducer";
import notificationAcceptREducer from "./views/NotificationDetails/reducer";
import authenticationReducer from "./authguard/reducer";
const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["toastr", "classes", "login", "pdfViewer"]
  // debug: true,
};

const rootReducer = persistCombineReducers(rootPersistConfig, {
  category: categoryReducer,
  curriculum: curriculumReducer,
  pdfViewer: pdfViewerReducer,
  login: loginReducer,
  event: eventReducer,
  toastr,
  spinnerStatus: spinnerStatusReducer,
  carouselStore: carouselReducer,
  modalReducer: modalReducer,
  homeReducerStore: homeReducer,
  studentReducer: studentReducer,
  notificationReducer: notificationReducer,
  notificationDetials: notifDetils,
  searchTeacher: searchTeacherReducer,
  video: videoReducer,
  teacherDetailsReducer: teacherDetailsReducer,
  categoryItem: categoryReducerForSubject,
  notificationAcceptREducer: notificationAcceptREducer,
  authStatus: authenticationReducer, 
  blogList : BlogDetailsREducer
});

const history = createBrowserHistory();

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk, routerMiddleware(history))
);

persistStore(store);

export { history };
export default store;
