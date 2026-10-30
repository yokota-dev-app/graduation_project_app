import { apiClient } from '../../shared/api/client';
import { mockPrompts } from './mockPrompts';
import type { Prompt } from './types';

export async function getMyPrompts(): Promise<Prompt[]> {
  return Promise.resolve(mockPrompts.map((prompt) => ({ ...prompt })));
}

export interface CreatePromptInput {
  title: string;
  description: string;
  content: string;
  isPublic: boolean;
  variableSettings: Record<string, string>;
}

export async function createPrompt(input: CreatePromptInput): Promise<{ id: number }> {
  const response = await apiClient.post('/prompts', {
    prompt: {
      title: input.title,
      description: input.description,
      content: input.content,
      is_public: input.isPublic,
      variable_settings: input.variableSettings,
    },
  });
  return response.data;
}
