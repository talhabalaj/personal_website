import { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '../../stores/windowStore';
import type { AppId } from '../../stores/windowStore';
import { apps } from '../../data/apps';

interface HistoryItem {
  command: string;
  output: string[];
  isError?: boolean;
  cwd: string;
}

interface FileNode {
  type: 'file' | 'dir';
  content?: string;
}

const fileSystem: Record<string, FileNode> = {
  '/home/talha': { type: 'dir' },
  '/home/talha/.secret': {
    type: 'file',
    content: `
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣤⣤⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀

  Congrats! You found the secret file!
  You must be a terminal pro. 🎉`,
  },
};

const HOME = '/home/talha';

function resolvePath(currentDir: string, path: string): string {
  if (!path) return currentDir;

  // Handle home directory shortcut
  if (path === '~') return HOME;
  if (path.startsWith('~/')) return HOME + path.slice(1);

  // Handle absolute paths
  if (path.startsWith('/')) return normalizePath(path);

  // Handle relative paths
  const parts = currentDir.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);

  for (const part of pathParts) {
    if (part === '..') {
      if (parts.length > 0) parts.pop();
    } else if (part !== '.') {
      parts.push(part);
    }
  }

  return '/' + parts.join('/');
}

function normalizePath(path: string): string {
  const parts = path.split('/').filter(Boolean);
  const result: string[] = [];

  for (const part of parts) {
    if (part === '..') {
      if (result.length > 0) result.pop();
    } else if (part !== '.') {
      result.push(part);
    }
  }

  return '/' + result.join('/');
}

function getDirectoryContents(dir: string): string[] {
  const contents: Set<string> = new Set();
  const dirPath = dir.endsWith('/') ? dir.slice(0, -1) : dir;

  for (const path of Object.keys(fileSystem)) {
    if (path === dirPath) continue;
    if (path.startsWith(dirPath + '/')) {
      const relativePath = path.slice(dirPath.length + 1);
      const firstPart = relativePath.split('/')[0];
      const fullPath = dirPath + '/' + firstPart;
      const node = fileSystem[fullPath];
      contents.add(node?.type === 'dir' ? firstPart + '/' : firstPart);
    }
  }

  return Array.from(contents).sort();
}

function formatPath(path: string): string {
  if (path === HOME) return '~';
  if (path.startsWith(HOME + '/')) return '~' + path.slice(HOME.length);
  return path;
}

export function TerminalApp() {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: '',
      output: [
        'TalhaOS Terminal v2.0.0',
        'Type "help" for available commands.',
        '',
      ],
      cwd: HOME,
    },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState(HOME);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const openWindow = useWindowStore((state) => state.openWindow);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addOutput = (command: string, output: string[], isError = false, cwd = currentDir) => {
    setHistory((prev) => [...prev, { command, output, isError, cwd }]);
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) {
      addOutput('', []);
      return;
    }

    // Parse command and args (handle quoted strings)
    const parts = trimmedCmd.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const command = parts[0]?.toLowerCase() || '';
    const args = parts.slice(1).map(arg => arg.replace(/^"|"$/g, ''));

    let output: string[] = [];
    let isError = false;

    switch (command) {
      case 'help':
        output = [
          'Available commands:',
          '',
          '  help              Show this help message',
          '  whoami            Display current user',
          '  pwd               Print working directory',
          '  ls [path]         List directory contents',
          '  ls -la [path]     List with details (shows hidden files)',
          '  cd <path>         Change directory',
          '  cat <file>        Display file contents',
          '  open <app>        Open an application',
          '  clear             Clear terminal (or Ctrl+L)',
          '  date              Display current date/time',
          '  echo <text>       Print text to terminal',
          '  history           Show command history',
          '',
          'Tips:',
          '  - Use Tab for auto-completion',
          '  - Use ↑/↓ arrows for command history',
          '  - Use Ctrl+C to cancel current input',
          '',
          'Apps: terminal, settings, snake, minesweeper',
        ];
        break;

      case 'whoami':
        output = ['talha'];
        break;

      case 'hostname':
        output = ['talhaos'];
        break;

      case 'pwd':
        output = [currentDir];
        break;

      case 'ls': {
        const showHidden = args.includes('-a') || args.includes('-la') || args.includes('-al');
        const showLong = args.includes('-l') || args.includes('-la') || args.includes('-al');
        const pathArg = args.find(a => !a.startsWith('-')) || currentDir;
        const targetPath = resolvePath(currentDir, pathArg);

        const node = fileSystem[targetPath];
        if (!node || node.type !== 'dir') {
          if (node?.type === 'file') {
            output = [pathArg];
          } else {
            output = [`ls: cannot access '${pathArg}': No such file or directory`];
            isError = true;
          }
          break;
        }

        let contents = getDirectoryContents(targetPath);
        if (!showHidden) {
          contents = contents.filter(f => !f.startsWith('.'));
        }

        if (contents.length === 0) {
          output = [];
        } else if (showLong) {
          output = contents.map(file => {
            const isDir = file.endsWith('/');
            const name = isDir ? file.slice(0, -1) : file;
            const type = isDir ? 'd' : '-';
            const size = isDir ? '4096' : ' 512';
            return `${type}rw-r--r--  talha  ${size.padStart(5)}  Jan 26 12:00  ${name}`;
          });
        } else {
          // Format in columns
          const maxLen = Math.max(...contents.map(f => f.length));
          const cols = Math.max(1, Math.floor(60 / (maxLen + 2)));
          const rows: string[] = [];
          for (let i = 0; i < contents.length; i += cols) {
            const row = contents.slice(i, i + cols);
            rows.push(row.map(f => f.padEnd(maxLen + 2)).join(''));
          }
          output = rows;
        }
        break;
      }

      case 'cd': {
        const target = args[0] || HOME;
        const newPath = resolvePath(currentDir, target);
        const node = fileSystem[newPath];

        if (node?.type === 'dir') {
          setCurrentDir(newPath);
          output = [];
        } else if (node?.type === 'file') {
          output = [`cd: not a directory: ${target}`];
          isError = true;
        } else {
          output = [`cd: no such file or directory: ${target}`];
          isError = true;
        }
        break;
      }

      case 'cat': {
        if (args.length === 0) {
          output = ['cat: missing file operand'];
          isError = true;
          break;
        }

        const filePath = resolvePath(currentDir, args[0]);
        const node = fileSystem[filePath];

        if (node?.type === 'file' && node.content) {
          output = node.content.split('\n');
        } else if (node?.type === 'dir') {
          output = [`cat: ${args[0]}: Is a directory`];
          isError = true;
        } else {
          output = [`cat: ${args[0]}: No such file or directory`];
          isError = true;
        }
        break;
      }

      case 'open': {
        const appName = args[0]?.toLowerCase();
        const appMap: Record<string, AppId> = {
          terminal: 'terminal',
          settings: 'settings',
          snake: 'snake',
          minesweeper: 'minesweeper',
        };

        if (!appName) {
          output = ['Usage: open <app>', '', 'Available apps: ' + Object.keys(appMap).join(', ')];
          isError = true;
        } else if (appMap[appName]) {
          const app = apps.find((a) => a.id === appMap[appName]);
          if (app) {
            openWindow(app.id, app.title, app.defaultSize);
            output = [`Opening ${app.name}...`];
          }
        } else {
          output = [`open: ${appName}: Application not found`, '', 'Available apps: ' + Object.keys(appMap).join(', ')];
          isError = true;
        }
        break;
      }

      case 'clear':
        setHistory([]);
        setCommandHistory((prev) => [...prev, trimmedCmd]);
        return;

      case 'date':
        output = [new Date().toLocaleString()];
        break;

      case 'echo':
        output = [args.join(' ')];
        break;

      case 'history':
        output = commandHistory.map((cmd, i) => `  ${(i + 1).toString().padStart(3)}  ${cmd}`);
        if (output.length === 0) output = ['No commands in history'];
        break;

      case 'mkdir':
      case 'touch':
      case 'rm':
      case 'mv':
      case 'cp':
        output = [`${command}: Operation not permitted (read-only filesystem)`];
        isError = true;
        break;

      case 'sudo':
        output = ['Nice try! You are not in the sudoers file. This incident will be reported.'];
        isError = true;
        break;

      case 'exit':
      case 'logout':
        output = ['logout', 'Use the X button to close the window.'];
        break;

      case 'neofetch':
        output = [
          '',
          '        ████████        talha@talhaos',
          '      ██        ██      -------------',
          '    ██    ████    ██    OS: TalhaOS 2.0',
          '    ██  ██    ██  ██    Host: Portfolio',
          '    ██  ██    ██  ██    Kernel: React 18',
          '    ██    ████    ██    Uptime: Since 2020',
          '      ██        ██      Shell: TerminalApp',
          '        ████████        Resolution: Responsive',
          '                        Theme: Dark',
          '    ██████████████      Terminal: TalhaOS Terminal',
          '                        CPU: TypeScript @ 100%',
          '',
        ];
        break;

      default:
        output = [`${command}: command not found`];
        isError = true;
    }

    addOutput(trimmedCmd, output, isError);
    setCommandHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);
  };

  const getCompletions = (input: string): string[] => {
    const parts = input.split(' ');
    const cmd = parts[0]?.toLowerCase();
    const lastPart = parts[parts.length - 1] || '';

    // Command completion
    if (parts.length === 1) {
      const commands = ['help', 'whoami', 'pwd', 'ls', 'cd', 'cat', 'open', 'clear', 'date', 'echo', 'history', 'neofetch'];
      return commands.filter(c => c.startsWith(cmd));
    }

    // App completion for 'open'
    if (cmd === 'open') {
      const appNames = ['terminal', 'settings', 'snake', 'minesweeper'];
      return appNames.filter(a => a.startsWith(lastPart.toLowerCase())).map(a => `open ${a}`);
    }

    // Path completion for cd, cat, ls
    if (['cd', 'cat', 'ls'].includes(cmd)) {
      const pathPrefix = lastPart;
      let searchDir = currentDir;
      let prefix = '';

      if (pathPrefix.includes('/')) {
        const lastSlash = pathPrefix.lastIndexOf('/');
        const dirPart = pathPrefix.slice(0, lastSlash) || '/';
        searchDir = resolvePath(currentDir, dirPart);
        prefix = pathPrefix.slice(0, lastSlash + 1);
      } else if (pathPrefix === '~') {
        return [`${cmd} ~/`];
      }

      const contents = getDirectoryContents(searchDir);
      const searchTerm = pathPrefix.includes('/')
        ? pathPrefix.slice(pathPrefix.lastIndexOf('/') + 1)
        : pathPrefix;

      const matches = contents.filter(f => f.startsWith(searchTerm) || f.startsWith('.' + searchTerm));

      if (cmd === 'cd') {
        return matches.filter(f => f.endsWith('/')).map(f => `${cmd} ${prefix}${f}`);
      }
      return matches.map(f => `${cmd} ${prefix}${f}`);
    }

    return [];
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const completions = getCompletions(currentInput);
      if (completions.length === 1) {
        setCurrentInput(completions[0]);
      } else if (completions.length > 1) {
        // Show completions
        addOutput(currentInput, completions, false);
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      addOutput(currentInput + '^C', [], false);
      setCurrentInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    } else if (e.key === 'u' && e.ctrlKey) {
      e.preventDefault();
      setCurrentInput('');
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-full bg-[#0d1117] p-4 font-mono text-sm overflow-auto"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((item, index) => (
        <div key={index} className="mb-1">
          {item.command !== undefined && item.command !== '' && (
            <div className="flex items-center">
              <span className="text-green-400">talha@talhaos</span>
              <span className="text-text-secondary">:</span>
              <span className="text-blue-400">{formatPath(item.cwd)}</span>
              <span className="text-text-secondary">$</span>
              <span className="text-text-primary ml-2">{item.command}</span>
            </div>
          )}
          {item.output.map((line, i) => (
            <div
              key={i}
              className={`whitespace-pre ${item.isError ? 'text-red-400' : 'text-text-secondary'}`}
            >
              {line || '\u00A0'}
            </div>
          ))}
        </div>
      ))}

      {/* Input line */}
      <div className="flex items-center">
        <span className="text-green-400">talha@talhaos</span>
        <span className="text-text-secondary">:</span>
        <span className="text-blue-400">{formatPath(currentDir)}</span>
        <span className="text-text-secondary">$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 ml-2 bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 text-text-primary caret-text-primary"
          style={{ outline: 'none' }}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
