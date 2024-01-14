import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import userSliceReducer from "../features/user/userSlice";
import subjectSliceReducer from "../features/studygroupsubject/studygroupsubjectSlice";
import gradeSliceReducer from "../features/grade/gradeSlice";
import studygroupSliceReducer from "../features/studygroup/studygroupSlice";
import chapterSliceReducer from "../features/chapter/chapterSlice";
import problemSliceReducer from "../features/problem/problemSlice";
import solutionSliceReducer from "../features/solution/solutionSlice";
import sidebarSliceReducer from "../features/sidebar/sidebarSlice";
import languageSliceReducer from "../features/language/languageSlice";
import zoomSliceReducer from "../features/zoom/zoomSlice";
import countrySliceReducer from "../features/country/countrySlice";
import subscriptionbandSliceReducer from "../features/subscriptionband/subscriptionbandSlice";
import popularitySliceReducer from "../features/popularity/popularitySlice";
import pagecontentSliceReducer from "../features/pagecontent/pagecontentSlice";
import studygrouppriceSliceReducer from "../features/studygroupprice/studygrouppriceSlice";
import testimonialSliceReducer from "../features/testimonial/testimonialSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    user: userSliceReducer,
    subject: subjectSliceReducer,
    studygroup: studygroupSliceReducer,
    grade: gradeSliceReducer,
    chapter: chapterSliceReducer,
    problem: problemSliceReducer,
    solution: solutionSliceReducer,
    sidebar: sidebarSliceReducer,
    language: languageSliceReducer,
    zoom: zoomSliceReducer,
    country: countrySliceReducer,
    subscriptionband: subscriptionbandSliceReducer,
    popularity: popularitySliceReducer,
    pagecontent: pagecontentSliceReducer,
    studygroupprice: studygrouppriceSliceReducer,
    testimonial: testimonialSliceReducer,
  },
  devTools: process.env.REACT_PUBLIC_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
