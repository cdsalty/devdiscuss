import Image from 'next/image';
import Link from 'next/link';
import RenderTag from './RenderTag';

const RightSideBar = () => {
  const hotQuestions = [
    { _id: '1', title: 'How do you use express as a backend with Nextjs?' },
    {
      _id: '2',
      title: 'How can you implement authentication in a Node.js application?',
    },
    {
      _id: '3',
      title: 'What are the best practices for using MongoDB with Node.js?',
    },
    {
      _id: '4',
      title: 'How do you handle file uploads in a React application?',
    },
    {
      _id: '5',
      title:
        'What methods are available for optimizing performance in a React Native app?',
    },
  ];

  const popularTags = [
    { _id: '1', name: 'React', totalQuestions: 7 },
    { _id: '2', name: 'Node.js', totalQuestions: 5 },
    { _id: '3', name: 'Authentication', totalQuestions: 4 },
    { _id: '4', name: 'Redux', totalQuestions: 6 },
    { _id: '5', name: 'Next.js', totalQuestions: 8 },
  ];
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              className="flex cursor-pointer items-center justify-between gap-7"
              href={`/questions/${question._id}`}
              key={question._id}
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="Arrow Right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {/* reusuable component */}
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
