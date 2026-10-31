import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { deletePrompt } from '../api';
import styles from './PromptActions.module.css';

interface PromptActionsProps {
  promptId: number;
  title: string;
  content: string;
  onMenuOpenChange?: (open: boolean) => void;
  onCopyError?: (failed: boolean) => void;
  onDeleted?: () => void;
}

export default function PromptActions({ promptId, title, content, onMenuOpenChange, onCopyError, onDeleted }: PromptActionsProps) {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const closeConfirm = () => {
    if (deleting) return;
    setConfirmOpen(false);
    setDeleteError('');
  };

  useEffect(() => {
    if (!confirmOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeConfirm();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  const confirmDelete = async () => {
    setDeleting(true);
    setDeleteError('');
    try {
      await deletePrompt(promptId);
      setConfirmOpen(false);
      onDeleted?.();
    } catch {
      setDeleteError('削除できませんでした。');
    } finally {
      setDeleting(false);
    }
  };

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
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                navigate(`/mypage/prompts/${promptId}/edit`);
              }}
            >
              編集
            </button>
            <button
              className={styles.deleteAction}
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                setConfirmOpen(true);
              }}
            >
              削除
            </button>
          </div>
        )}
      </div>
      {confirmOpen &&
        createPortal(
          <div className={styles.overlay} onClick={closeConfirm}>
            <div
              className={styles.dialog}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-dialog-title"
              onClick={(event) => event.stopPropagation()}
            >
              <p id="delete-dialog-title">プロンプトを削除してよろしいですか？</p>
              {deleteError && <p className={styles.dialogError} role="alert">{deleteError}</p>}
              <div className={styles.dialogActions}>
                <button type="button" className={styles.dialogCancel} autoFocus onClick={closeConfirm}>
                  キャンセル
                </button>
                <button type="button" className={styles.dialogOk} disabled={deleting} onClick={confirmDelete}>
                  OK
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
