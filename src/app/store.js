import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import userSliceReducer from "../features/user/userSlice";
import subjectSliceReducer from "../features/bookclubsubject/bookclubsubjectSlice";
import gradeSliceReducer from "../features/grade/gradeSlice";
import bookclubSliceReducer from "../features/bookclub/bookclubSlice";
import chapterSliceReducer from "../features/chapter/chapterSlice";
import problemSliceReducer from "../features/problem/problemSlice";
import solutionSliceReducer from "../features/solution/solutionSlice";
import sidebarSliceReducer from "../features/sidebar/sidebarSlice";
import languageSliceReducer from "../features/language/languageSlice";
import countrySliceReducer from "../features/country/countrySlice";
import subscriptionbandSliceReducer from "../features/subscriptionband/subscriptionbandSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    user: userSliceReducer,
    subject: subjectSliceReducer,
    bookclub: bookclubSliceReducer,
    grade: gradeSliceReducer,
    chapter: chapterSliceReducer,
    problem: problemSliceReducer,
    solution: solutionSliceReducer,
    sidebar: sidebarSliceReducer,
    language: languageSliceReducer,
    country: countrySliceReducer,
    subscriptionband: subscriptionbandSliceReducer,
  },
  devTools: process.env.REACT_PUBLIC_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
