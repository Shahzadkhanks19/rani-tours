"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";

export type AppDialogTone = "info" | "success" | "warning" | "danger";

type Props = {
  open: boolean;
  title: string;
  message: string;
  tone?: AppDialogTone;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

const toneMap = {
  info: { icon: Info, wrap: "bg-[#edf5e8] text-[#0b6531]" },
  success: { icon: CheckCircle2, wrap: "bg-[#edf5e8] text-[#0b6531]" },
  warning: { icon: AlertTriangle, wrap: "bg-[#fff6df] text-[#a66b00]" },
  danger: { icon: AlertTriangle, wrap: "bg-[#fff0ec] text-[#b33a2f]" },
} as const;

export function AppDialog({ open, title, message, tone = "info", confirmLabel = "OK", cancelLabel = "Cancel", onConfirm, onCancel }: Props) {
  const config = toneMap[tone];
  const Icon = config.icon;
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[9999] grid place-items-center bg-[#08130d]/55 px-4 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="presentation" onMouseDown={(e) => { if (e.currentTarget === e.target && onCancel) onCancel(); }}>
          <motion.section role="dialog" aria-modal="true" aria-labelledby="app-dialog-title" aria-describedby="app-dialog-message" initial={{ opacity: 0, y: 16, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: .98 }} transition={{ duration: .18 }} className="w-full max-w-md overflow-hidden rounded-[24px] border border-[#dfe5db] bg-white shadow-[0_26px_90px_rgba(0,0,0,.22)]">
            <div className="p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${config.wrap}`}><Icon className="h-5 w-5" /></div>
                <div className="min-w-0 flex-1"><h2 id="app-dialog-title" className="font-serif text-xl font-bold text-[#17341f]">{title}</h2><p id="app-dialog-message" className="mt-2 text-sm leading-6 text-[#657066]">{message}</p></div>
                {onCancel ? <button type="button" onClick={onCancel} aria-label="Close dialog" className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#6d786f] transition hover:bg-[#f2f5f0] hover:text-[#17341f]"><X className="h-4 w-4" /></button> : null}
              </div>
              <div className="mt-7 flex flex-wrap justify-end gap-3">
                {onCancel ? <button type="button" onClick={onCancel} className="min-h-11 rounded-xl border border-[#cfd8cd] bg-white px-5 text-sm font-bold text-[#29402f] transition hover:bg-[#f5f8f3]">{cancelLabel}</button> : null}
                <button type="button" onClick={onConfirm} autoFocus className={`min-h-11 rounded-xl px-5 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 ${tone === "danger" ? "bg-[#b33a2f] text-white hover:bg-[#982f27]" : "bg-[#d6a63a] text-[#17341f] hover:bg-[#e4b844]"}`}>{confirmLabel}</button>
              </div>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
