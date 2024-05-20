/* eslint-disable no-empty */
'use server';

import { connectToDatabase } from './mongoose';
import Question from '@/database/question.model';
import Tag from '@/database/tag.model';
import User from '@/database/user.model';
import { CreateQuestionParams, GetQuestionsParams } from './shared.types';
import { revalidatePath } from 'next/cache';

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();
    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag }) // .populate() allows you to reference the name of the field that you want to populate from the objectid so they can be displayed in the frontend (mongodb gives us only the ObjectId, but we want the actual tag name... This is where .populate comes in.)
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 }); // sort by createdAt in descending order (newest first
    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();
    // eslint-disable-next-line no-unused-vars
    const { title, content, tags, author, path } = params;
    console.log(
      'This is the "path", that is being passed down as a prop from Question HOME to the createQuestion action: ' +
        path
    );
    // CREATE question
    const question = await Question.create({
      title,
      content,
      author,
    });

    // Tags (each tag is a document)
    const tagDocuments = [];

    // Create a new tag document; if the tag already exists, then I need to push the tag to the tagDocuments array,
    // for-of loop to iterate over the tags array; iterates over the values of an iterable object.
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        // first parameter allows you to filter and  find something in the database
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        // the second parameter allows you to do something with the found document
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        // any additional options
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }
    // Once I have the tags, I can then update the question document with the tags
    // this is why I needed to create the tagDocuments array
    await Question.findByIdAndUpdate(question._id, {
      // for each tag document, need to push the ID of that tag and that's going to be added to the question.
      $push: { tags: { $each: tagDocuments } },
    });

    // TODO: Create an interaction record for the user's "ask_question action"

    // TODO: Create scoring system; Increment the author's reputation by 5 points for creating a question

    revalidatePath(path);
  } catch (error) {}
}

/*
Will hold all the server actions for the question model.

- make a call to the sever action, connect to the database and the database makes a document. 


First, we need to accept the parameters from the client--> everything that is passed from the form such as the title, explanation, the tags and author.
  - will also need to pass in a "path" property. This path will go to the URL of the homepage ~> where all the questions are listed to inform that something has changed/updated.

*/
