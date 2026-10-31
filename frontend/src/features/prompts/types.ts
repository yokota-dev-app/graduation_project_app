export interface Prompt {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  updatedAt: string;
  variableSettings: Record<string, string>;
}
