/* eslint-disable no-empty */
'use server';

import { connectToDatabase } from './mongoose';

export async function createQuestion(params: any) {
  try {
    connectToDatabase();
  } catch (error) {}
}

/*
Will hold all the server actions for the question model.

- make a call to the sever action, connect to the database and the database makes a document. 

*/
