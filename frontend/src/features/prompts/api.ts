import { apiClient } from '../../shared/api/client';
import type { Prompt } from './types';

interface PromptResponse {
  id: number;
  title: string;
  description: string | null;
  content: string;
  author: string;
  updated_at: string;
}

function formatDate(value: string): string {
  const date = new Date(value);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}/${month}/${day}`;
}

export async function getMyPrompts(): Promise<Prompt[]> {
  const response = await apiClient.get<PromptResponse[]>('/prompts');
  return response.data.map((item) => ({
    id: item.id,
    title: item.title,
    summary: item.description ?? '',
    content: item.content,
    author: item.author,
    updatedAt: formatDate(item.updated_at),
  }));
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
