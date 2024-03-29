import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../auth/authSlice";
import axios from "../../lib/axios";
import Cookies from "js-cookie";
// import { getCookie } from 'cookies-next'

const csrf = () => axios.get("/sanctum/csrf-cookie");

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_PUBLIC_BACKEND_URL,
  prepareHeaders: async (headers, { getState, endpoint, type }) => {
    // const token = getState()?.auth?.accessToken
    // if (token) {
    //     headers.set('Authorization', `Bearer ${token}`)
    // }
    // headers.set('Authorization', `Bearer ${token}`)

    if(type=='mutation'){
      await csrf()
    }

    const token = decodeURIComponent(Cookies.get("XSRF-TOKEN"));
    // getCookie('XSRF-TOKEN')
    headers.set("X-XSRF-TOKEN", token);
    // if (!headers.has('Content-Type')) {
    //     headers.set('Content-Type', 'application/json')
    // }
    headers.set("X-Requested-With", `XMLHttpRequest`);
    headers.set("Access-Control-Allow-Origin", "*");

    return headers;
  },
  credentials: "include",
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
      api.dispatch(userLoggedOut());
      localStorage.clear();
    }
    return result;
  },
  tagTypes: [],
  endpoints: (builder) => ({}),
});
