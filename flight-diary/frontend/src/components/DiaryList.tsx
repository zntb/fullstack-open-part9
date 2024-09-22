import { NonSensitiveDiaryEntry } from '../types';

interface DiaryListProps {
  diaries: NonSensitiveDiaryEntry[];
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  if (!Array.isArray(diaries) || diaries.length === 0) {
    return <p>No diary entries found.</p>;
  }

  return (
    <>
      <h1>Diary Entries</h1>
      <ul style={{ listStyle: 'none' }}>
        {diaries.map(diary => (
          <li key={diary.id}>
            <strong>{diary.date}</strong> <br />
            Weather: {diary.weather} <br />
            Visibility: {diary.visibility} <br /> <br />
          </li>
        ))}
      </ul>
    </>
  );
};

export default DiaryList;
