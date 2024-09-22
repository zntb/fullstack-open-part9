import axios from 'axios';
import { DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getDiaries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

export const addDiary = async (
  newDiary: Omit<DiaryEntry, 'id'>,
): Promise<DiaryEntry> => {
  const response = await axios.post<DiaryEntry>(baseUrl, newDiary);
  return response.data;
};
