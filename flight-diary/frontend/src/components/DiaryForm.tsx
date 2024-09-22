import { useState } from 'react';
import { DiaryEntry, Weather, Visibility } from '../types';
import { addDiary } from '../services/diaryService';
import axios, { AxiosError } from 'axios';

interface DiaryFormProps {
  onAddDiary: (newDiary: Omit<DiaryEntry, 'id'>) => void;
}

const DiaryForm = ({ onAddDiary }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!date) {
      setError('Please select a date.');
      return;
    }

    if (!visibility || !weather) {
      setError('Please select both visibility and weather.');
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
      setVisibility(Visibility.Great);
      setWeather(Weather.Sunny);
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
          Date
          <input
            type='date'
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div>
          Visibility
          {Object.values(Visibility).map(value => (
            <span key={value}>
              <input
                type='radio'
                name='visibility'
                value={value}
                checked={visibility === value}
                onChange={() => setVisibility(value)}
              />
              <label>{value}</label>
            </span>
          ))}
        </div>
        <div>
          Weather
          {Object.values(Weather).map(value => (
            <span key={value}>
              <input
                type='radio'
                name='weather'
                value={value}
                checked={weather === value}
                onChange={() => setWeather(value)}
              />
              <label>{value}</label>
            </span>
          ))}
        </div>
        <div>
          Comment
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
