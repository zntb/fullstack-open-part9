export type CoursePart = {
  name: string;
  exerciseCount: number;
};

type ContentProps = {
  parts: CoursePart[];
};

const Content = ({ parts }: ContentProps) => (
  <>
    {parts.map(part => (
      <p key={part.name}>
        {part.name} {part.exerciseCount}
      </p>
    ))}
  </>
);

export default Content;
