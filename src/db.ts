import { DataStore } from "notarealdb";

export interface IActor {
   id: string;
   name: string;
   birthday: string;
   country: string;
   directorsIds: string[];
 }

export interface IDirector {
   id: string;
   name: string;
   birthday: string;
   country: string;
 }

export interface IMovie {
   id: string;
   title: string;
   year: string;
   rating: string;
   actorsIds: string[];
 }

export interface IUser {
   id: string;
   username: string;
   password: string;
 }

const store = new DataStore("./data");

export const actors = store.collection<IActor>("actors");
export const directors = store.collection<IDirector>("directors");
export const movies = store.collection<IMovie>("movies");
export const users = store.collection<IUser>("users");
