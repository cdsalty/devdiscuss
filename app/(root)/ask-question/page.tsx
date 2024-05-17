import Question from '@/components/forms/Question';
import { getUserById } from '@/lib/actions/user.action';
// import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

const AskQuestionsPage = async () => {
  // Will need to get the current user id from clerk's auth
  // const { userId } = auth();

  const userId = 'clerk12345';

  if (!userId) redirect('/');

  // need to pass mongoDbUser to the question component.
  const mongoUser = await getUserById({ userId });
  console.log('The mongoDB User from the ask-question page: ', mongoUser);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <div>
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default AskQuestionsPage;
