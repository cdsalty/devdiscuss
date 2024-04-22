import React from 'react';

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
    <div>
      {name} - {totalQuestions}
      {/* 13:42 mark */}
      {/* https://courses.jsmastery.pro/course/ultimate-nextjs/011_sidebar/004_rightsidebar-component */}
    </div>
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
