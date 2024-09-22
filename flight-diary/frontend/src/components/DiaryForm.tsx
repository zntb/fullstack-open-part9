import { useState } from 'react';
import { DiaryEntry, Weather, Visibility } from '../types';

interface DiaryFormProps {
  onAddDiary: (newDiary: Omit<DiaryEntry, 'id'>) => void;
}

const DiaryForm = ({ onAddDiary }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAddDiary({ date, weather, visibility, comment });
    setDate('');
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Great);
    setComment('');
  };

  return (
    <>
      <h1>Add a new diary entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          date
          <input
            type='text'
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            type='text'
            value={visibility}
            onChange={e => setVisibility(e.target.value as Visibility)}
          />
        </div>
        <div>
          weather
          <input
            type='text'
            value={weather}
            onChange={e => setWeather(e.target.value as Weather)}
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
