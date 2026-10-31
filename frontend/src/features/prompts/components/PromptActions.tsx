import { useEffect, useRef, useState } from 'react';
import styles from './PromptActions.module.css';

interface PromptActionsProps {
  title: string;
  content: string;
  onMenuOpenChange?: (open: boolean) => void;
  onCopyError?: (failed: boolean) => void;
}

export default function PromptActions({ title, content, onMenuOpenChange, onCopyError }: PromptActionsProps) {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onMenuOpenChange?.(menuOpen);
  }, [menuOpen, onMenuOpenChange]);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      onCopyError?.(false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      onCopyError?.(true);
      setCopied(false);
    }
  };

  return (
    <div className={styles.cardActions} onClick={(event) => event.stopPropagation()}>
      <button
        className={styles.copyButton}
        type="button"
        onClick={copyPrompt}
        aria-label={`「${title}」のプロンプト内容をコピー`}
        title={copied ? 'コピーしました' : 'プロンプトをコピー'}
      >
        {copied ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m5 12 4 4L19 6" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="8" y="8" width="12" height="12" rx="2" />
            <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
          </svg>
        )}
      </button>
      <div className={styles.menuContainer} ref={menuRef}>
        <button
          className={styles.menuToggle}
          type="button"
          aria-label={`${title}のメニュー`}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="5" cy="12" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
          </svg>
        </button>
        {menuOpen && (
          <div className={styles.menu} role="menu" aria-label={`${title}の操作`}>
            <button type="button" role="menuitem" onClick={() => setMenuOpen(false)}>ピン留め</button>
            <button type="button" role="menuitem" onClick={() => setMenuOpen(false)}>編集</button>
            <button
              className={styles.deleteAction}
              type="button"
              role="menuitem"
              onClick={() => setMenuOpen(false)}
            >
              削除
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
