import { Lesson } from '../types';
import { FRONTEND_LESSONS } from './tracks/frontend';
import { BACKEND_LESSONS } from './tracks/backend';
import { CYBERSECURITY_LESSONS } from './tracks/cybersecurity';
import { GAMEDEV_LESSONS } from './tracks/gamedev';
import { GTA_LESSONS } from './tracks/gta';
import { DEVOPS_LESSONS } from './tracks/devops';

export const ALL_LESSONS: Lesson[] = [
  ...FRONTEND_LESSONS,
  ...BACKEND_LESSONS,
  ...CYBERSECURITY_LESSONS,
  ...GAMEDEV_LESSONS,
  ...GTA_LESSONS,
  ...DEVOPS_LESSONS
];

export function getLessonById(lessonId: string): Lesson | undefined {
  return ALL_LESSONS.find(l => l.id === lessonId);
}

export function getLessonsByTrack(trackId: string): Lesson[] {
  return ALL_LESSONS.filter(l => l.trackId === trackId);
}
