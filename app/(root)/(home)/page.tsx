import QuestionCard from '@/components/cards/QuestionCard';
import HomeFilters from '@/components/home/HomeFilters';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import Link from 'next/link';

const questions = [
  {
    _id: '1',
    title: 'What are server components?',
    tags: [
      { _id: 1, name: 'React' },
      { _id: 2, name: 'Nextjs' },
    ],
    author: {
      _id: 'a1',
      name: 'Johnny Doe',
      picture: 'url_to_johnny_picture.jpg',
    },
    upvotes: 15090000,
    views: 110000,
    answers: [],
    createdAt: new Date('2023-09-01T20:15:00.000Z'),
  },
  {
    _id: '2',
    title: 'How do you use hooks in React?',
    tags: [
      { _id: 1, name: 'React' },
      { _id: 3, name: 'Web Development' },
    ],
    author: {
      _id: 'a2',
      name: 'Jane Smith',
      picture: 'url_to_jane_picture.jpg',
    },
    upvotes: 25000,
    views: 150000,
    answers: [],
    createdAt: new Date('2022-03-01T20:40:00.000Z'),
  },
  {
    _id: '3',
    title: 'What are the best practices for error handling in Node.js?',
    tags: [
      { _id: 4, name: 'Nodejs' },
      { _id: 5, name: 'Backend' },
    ],
    author: {
      _id: 'a3',
      name: 'Emily Johnson',
      picture: 'url_to_emily_picture.jpg',
    },
    upvotes: 1500,
    views: 2000,
    answers: [],
    createdAt: new Date('2021-09-01T15:30:00.000Z'),
  },
  {
    _id: '4',
    title: 'How to optimize performance in a React application?',
    tags: [
      { _id: 1, name: 'React' },
      { _id: 6, name: 'Performance' },
    ],
    author: {
      _id: 'a4',
      name: 'Michael Brown',
      picture: 'url_to_michael_picture.jpg',
    },
    upvotes: 30000,
    views: 3000000,
    answers: [],
    createdAt: new Date('2021-09-01T20:15:00.000Z'),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search Questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {/* Loop through questions. For each question, need to return a Question Card */}
        {questions.length > 0 ? (
          questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There are no questions to show"
            description="Step up and be the first to break the silence. Ask a question to
            kickstart a world of possiblities."
            link="/ask-question"
            linkTitle="Ask A Question!"
          />
        )}
      </div>
    </>
  );
}
