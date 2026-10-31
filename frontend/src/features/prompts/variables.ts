const VARIABLE_PATTERN = /\{\{\s*([^{}\s]+)\s*\}\}/g;

export function applyVariables(content: string, settings: Record<string, string>): string {
  return content.replace(VARIABLE_PATTERN, (match, name: string) => settings[name] || match);
}
