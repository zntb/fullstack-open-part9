import { useState } from 'react';
import { NewDiaryEntry, Weather, Visibility } from '../types';
import { addDiary } from '../services/diaryService';
import axios, { AxiosError } from 'axios';

interface DiaryFormProps {
  onAddDiary: (newDiary: NewDiaryEntry) => void;
}

const DiaryForm = ({ onAddDiary }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isValidDate = (dateString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const dateParts = dateString.split('-').map(Number);
    const jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === dateParts[0];
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidDate(date)) {
      setError('Invalid date format. Please use YYYY-MM-DD.');
      return;
    }

    if (!Object.values(Visibility).includes(visibility as Visibility)) {
      setError(`Incorrect visibility: ${visibility}`);
      return;
    }

    if (!Object.values(Weather).includes(weather as Weather)) {
      setError(`Incorrect weather: ${weather}`);
      return;
    }

    if (comment.trim().length === 0) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      const newDiary = await addDiary({
        date,
        visibility: visibility as Visibility,
        weather: weather as Weather,
        comment,
      });
      onAddDiary(newDiary);
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
      setError(null);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const errorMsg = (e as AxiosError<{ error: string }>).response?.data
          .error;
        setError(errorMsg || 'An unknown error occurred');
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <>
      <h1>Add a new diary entry</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          date
          <input
            type='text'
            value={date}
            onChange={e => {
              setDate(e.target.value);
              if (!isValidDate(e.target.value)) {
                setError('Invalid date format. Please use YYYY-MM-DD.');
              } else {
                setError(null);
              }
            }}
          />
        </div>
        <div>
          visibility
          <input
            type='text'
            value={visibility}
            onChange={e => setVisibility(e.target.value)}
          />
        </div>
        <div>
          weather
          <input
            type='text'
            value={weather}
            onChange={e => setWeather(e.target.value)}
          />
        </div>
        <div>
          comment
          <input
            type='text'
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
    </>
  );
};

export default DiaryForm;
