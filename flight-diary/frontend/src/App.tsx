import { useEffect, useState } from 'react';
import { getDiaries } from './services/diaryService';
import { DiaryEntry } from './types';
import DiaryList from './components/DiaryList';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const fetchedDiaries = await getDiaries();
        setDiaries(fetchedDiaries);
      } catch (err) {
        setError('Could not fetch diary entries');
        console.error(err);
      }
    };

    fetchDiaries();
  }, []);

  return (
    <div>
      <h1>Diary Entries</h1>
      {error ? <p>{error}</p> : <DiaryList diaries={diaries} />}
    </div>
  );
};

export default App;
