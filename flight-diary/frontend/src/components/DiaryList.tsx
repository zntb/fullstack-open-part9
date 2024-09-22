import { DiaryEntry } from '../types';

interface DiaryListProps {
  diaries: DiaryEntry[];
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  if (!Array.isArray(diaries) || diaries.length === 0) {
    return <p>No diary entries found.</p>;
  }
  return (
    <ul style={{ listStyle: 'none' }}>
      {diaries.map(diary => (
        <li key={diary.id}>
          <strong>{diary.date}</strong> <br />
          Weather: {diary.weather} <br />
          Visibility: {diary.visibility} <br /> <br />
        </li>
      ))}
    </ul>
  );
};

export default DiaryList;
