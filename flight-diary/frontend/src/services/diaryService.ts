import axios from 'axios';
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getDiaries = async (): Promise<NonSensitiveDiaryEntry[]> => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return response.data;
};

export const addDiary = async (newDiary: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, newDiary);
  return response.data;
};
