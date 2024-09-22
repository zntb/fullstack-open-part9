import { useEffect, useState } from 'react';
import { getDiaries, addDiary } from './services/diaryService';
import { NonSensitiveDiaryEntry, NewDiaryEntry } from './types';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const fetchedDiaries = await getDiaries();
        setDiaries(fetchedDiaries);
      } catch (err) {
        setError('Could not fetch diary entries');
        console.error('Failed to fetch diary entries:', err);
      }
    };

    fetchDiaries();
  }, []);

  const handleNewDiary = async (newDiary: NewDiaryEntry) => {
    try {
      const addedDiary = await addDiary(newDiary);
      setDiaries(diaries.concat(addedDiary));
    } catch (error) {
      console.error('Failed to add diary entry:', error);
      setError('Failed to add new diary entry.');
    }
  };

  return (
    <div>
      <DiaryForm onAddDiary={handleNewDiary} />
      {error ? <p>{error}</p> : <DiaryList diaries={diaries} />}
    </div>
  );
};

export default App;
