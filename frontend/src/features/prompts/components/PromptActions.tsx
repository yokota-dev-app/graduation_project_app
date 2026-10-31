import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { deletePrompt } from '../api';

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
    <div className="flex flex-[0_0_auto] items-center gap-[4px]" onClick={(event) => event.stopPropagation()}>
      <button
        className="grid h-[32px] w-[32px] flex-[0_0_32px] place-items-center rounded-[8px] border border-solid border-[#e9e7ed] bg-white text-[#696572] hover:border-[#c9c0dc] hover:text-[#382569] [&_svg]:h-[18px] [&_svg]:w-[18px] [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round] [&_svg]:[stroke-width:1.8] cursor-pointer"
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
      <div className="relative" ref={menuRef}>
        <button
          className="grid h-[32px] w-[32px] place-items-center rounded-[8px] border border-solid border-transparent bg-transparent text-[#696572] hover:border-[#e9e7ed] hover:bg-[#faf9fc] hover:text-[#382569] aria-expanded:border-[#e9e7ed] aria-expanded:bg-[#faf9fc] aria-expanded:text-[#382569] [&_svg]:h-[19px] [&_svg]:w-[19px] [&_svg]:fill-current cursor-pointer"
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
          <div className="absolute right-0 top-[calc(100%+6px)] z-[3] grid w-[136px] rounded-[9px] border border-solid border-[#e9e7ed] bg-white p-[5px] [box-shadow:0_8px_22px_rgb(36_28_55/14%)]" role="menu" aria-label={`${title}の操作`}>
            <button className="rounded-[6px] border-0 border-none border-[#45424d] bg-transparent px-[10px] py-[9px] text-left text-[#45424d] text-[12px] [font-family:inherit] hover:bg-[#f5f3f8] focus-visible:bg-[#f5f3f8] focus-visible:[outline:none] cursor-pointer" type="button" role="menuitem" onClick={() => setMenuOpen(false)}>ピン留め</button>
            <button
              className="rounded-[6px] border-0 border-none border-[#45424d] bg-transparent px-[10px] py-[9px] text-left text-[#45424d] text-[12px] [font-family:inherit] hover:bg-[#f5f3f8] focus-visible:bg-[#f5f3f8] focus-visible:[outline:none] cursor-pointer"
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
              className="rounded-[6px] border-0 border-none border-[#c33b36] bg-transparent px-[10px] py-[9px] text-left text-[#c33b36] text-[12px] [font-family:inherit] hover:bg-[#fff1f0] focus-visible:bg-[#fff1f0] focus-visible:[outline:none] cursor-pointer"
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
          <div className="fixed inset-0 z-[100] grid place-items-center bg-[rgb(36_28_55/45%)]" onClick={closeConfirm}>
            <div
              className="w-[min(90vw,380px)] cursor-default rounded-[12px] bg-white p-[24px] text-[#28252f] [box-shadow:0_16px_40px_rgb(36_28_55/25%)]"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-dialog-title"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="m-0 text-[15px] font-bold leading-[1.6]" id="delete-dialog-title">プロンプトを削除してよろしいですか？</p>
              {deleteError && <p className="m-0 mt-[8px] text-[#b42318] text-[12px] font-normal" role="alert">{deleteError}</p>}
              <div className="mt-[20px] flex justify-end gap-[10px]">
                <button type="button" className="h-[38px] min-w-[88px] rounded-[8px] border-0 border-none border-[#45424d] bg-[#ececf0] text-[#45424d] text-[13px] cursor-pointer" autoFocus onClick={closeConfirm}>
                  キャンセル
                </button>
                <button type="button" className="h-[38px] min-w-[88px] rounded-[8px] border-0 border-none border-white bg-[#c33b36] text-white text-[13px] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer" disabled={deleting} onClick={confirmDelete}>
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
