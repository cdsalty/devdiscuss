import Link from 'next/link';
import React from 'react';
import { Badge } from '../ui/badge';

interface RenderTagProps {
  _id: number;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({
  _id,
  name,
  totalQuestions,
  showCount,
}: RenderTagProps) => {
  return (
    <Link
      href={`/tags/${_id}`}
      key={_id}
      className="flex justify-between gap-2"
    >
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>
      {/* //TODO: Evaluate and determine if totalQuestions should be inside the badge */}
      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  );
};

export default RenderTag;

/*

After the boilerplate, the process:
1. Inside RightSideBar, import RenderTag 
  
2. Create dummy data to map over inside of the RightSideBar component.
3. map over the dummy data and render the RenderTag component.
  - when iterating over the RenderTag, pass in the following props:
    <RenderTag 
      key={tag._id}
      _id={tag._id}
      name={tag.name}
      totalQuestions={tag.totalQuestions}
      showCount
    />

4. Inside of the RenderTag component, we need to let TypeScript know what props to expect. To do this, we need to create an interface that will define the shape of the props that will be passed to the component.
  - a) create the interface and then b) destructure the props inside of the component.
    - interface RenderTagProps {
      _id: number;
      name: string;
      totalQuestions?: number;
      showCount?: boolean;
    }
    - const RenderTag = ({_id, name, totalQuestions, showCount}: RenderTagProps) => {
    return (
      <div>RenderTag</div>
      )
    } 

    5. Inside of the RenderTag component, render the name and totalQuestions props.
      <div>{name} - {totalQuestions}</div>


      THAT'S IT! You've successfully created a reusable component that can be used to render tags in the application.
*/
