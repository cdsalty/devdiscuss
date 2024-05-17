'use server';

import User from '@/database/user.model';
import { connectToDatabase } from './mongoose';

// need to search for the user by the clerk ID
export async function getUserById(params: any) {
  try {
    connectToDatabase();
    console.log('The Params being passed inside the user.action: ', params);
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log('Error in getUserById: ', error);
    throw error;
  }
}
