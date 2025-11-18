import { bundledLanguages, type BundledLanguage } from 'shiki';

export function inferLanguageFromClass(className?: string): BundledLanguage | undefined {
  if (!className) return undefined;

  const classes = className.split(/\s+/).filter(Boolean);

  const langToken = classes
    .map((c) => {
      const match = /^language-([A-Za-z0-9_+-]+)$/i.exec(c);
      return match ? match[1] : undefined;
    })
    .find(Boolean);

  if (!langToken) return undefined;

  const normalized = normalizeLanguageAlias(langToken.toLowerCase());

  if (normalized in bundledLanguages) {
    return normalized as BundledLanguage;
  }

  const fallback = normalizeKnownVariants(normalized);
  if (fallback && fallback in bundledLanguages) {
    return fallback as BundledLanguage;
  }

  return undefined;
}

function normalizeLanguageAlias(lang: string): string {
  switch (lang) {
    case 'js':
    case 'node':
    case 'nodejs':
    case 'javascript':
      return 'javascript';

    case 'mjs':
    case 'cjs':
      return 'javascript';

    case 'ts':
    case 'typescript':
      return 'typescript';

    case 'tsx':
      return 'tsx';

    case 'jsx':
      return 'jsx';

    case 'py':
    case 'python':
      return 'python';

    case 'rb':
    case 'ruby':
      return 'ruby';

    case 'sh':
    case 'bash':
      return 'bash';

    case 'zsh':
      return 'zsh';

    case 'ps1':
    case 'powershell':
      return 'powershell';

    case 'yml':
    case 'yaml':
      return 'yaml';

    case 'json':
      return 'json';

    case 'toml':
      return 'toml';

    case 'ini':
      return 'ini';

    case 'md':
    case 'markdown':
      return 'markdown';

    case 'html':
      return 'html';

    case 'css':
      return 'css';

    case 'scss':
      return 'scss';

    case 'less':
      return 'less';

    case 'sql':
      return 'sql';

    case 'java':
      return 'java';

    case 'kt':
    case 'kotlin':
      return 'kotlin';

    case 'swift':
      return 'swift';

    case 'go':
    case 'golang':
      return 'go';

    case 'rs':
    case 'rust':
      return 'rust';

    case 'c':
      return 'c';

    case 'cpp':
    case 'c++':
      return 'cpp';

    case 'cs':
    case 'csharp':
    case 'c#':
      return 'csharp';

    case 'php':
      return 'php';

    case 'r':
      return 'r';

    case 'scala':
      return 'scala';

    case 'dart':
      return 'dart';

    case 'elixir':
      return 'elixir';

    case 'erlang':
      return 'erlang';

    case 'haskell':
      return 'haskell';

    case 'lua':
      return 'lua';

    case 'perl':
      return 'perl';

    case 'objective-c':
    case 'objc':
    case 'obj-c':
      return 'objective-c';

    case 'makefile':
      return 'makefile';

    case 'dockerfile':
      return 'dockerfile';

    case 'nginx':
      return 'nginx';

    case 'apache':
      return 'apache';

    case 'gradle':
      return 'gradle';

    case 'groovy':
      return 'groovy';

    case 'protobuf':
    case 'proto':
      return 'protobuf';

    case 'regex':
    case 'regexp':
      return 'regex';

    case 'graphql':
    case 'gql':
      return 'graphql';

    case 'nim':
      return 'nim';

    case 'nimble':
      return 'nimble';

    default:
      return lang;
  }
}

function normalizeKnownVariants(lang: string): string | undefined {
  switch (lang) {
    case 'c++':
      return 'cpp';
    case 'c#':
      return 'csharp';
    case 'obj-c':
    case 'objc':
      return 'objective-c';
    default:
      return undefined;
  }
}
