import { mockPrompts } from './mockPrompts';
import type { Prompt } from './types';

export async function getMyPrompts(): Promise<Prompt[]> {
  return Promise.resolve(mockPrompts.map((prompt) => ({ ...prompt })));
}
