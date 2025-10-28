// Minimal `cn` utility used by shadcn components
export function cn(...args: Array<string | false | null | undefined>): string {
  return args.filter(Boolean).join(' ');
}
