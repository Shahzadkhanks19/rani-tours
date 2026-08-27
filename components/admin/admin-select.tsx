"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type AdminSelectOption = { value: string; label: string };

type Props = {
  value: string;
  options: AdminSelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function AdminSelect({ value, options, onChange, placeholder = "Select option", disabled = false, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button type="button" disabled={disabled} onClick={() => setOpen((current) => !current)} aria-haspopup="listbox" aria-expanded={open} className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-[#143124]/15 bg-[#f8faf6] px-4 text-left text-sm font-medium text-[#213626] outline-none transition hover:border-[#0b6b3a]/40 focus:border-[#0b6b3a] focus:ring-4 focus:ring-[#0b6b3a]/8 disabled:cursor-not-allowed disabled:opacity-55">
        <span className={!selected ? "text-[#829086]" : ""}>{selected?.label || placeholder}</span>
        <ChevronDown className={`size-4 shrink-0 text-[#607365] transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div role="listbox" className="absolute right-0 z-[80] mt-2 max-h-72 min-w-full overflow-auto rounded-2xl border border-[#dce4da] bg-white p-1.5 shadow-[0_18px_55px_rgba(20,49,36,.15)]">
          {options.map((option) => {
            const active = option.value === value;
            return <button key={option.value} type="button" role="option" aria-selected={active} onClick={() => { onChange(option.value); setOpen(false); }} className={`flex w-full items-center justify-between gap-4 rounded-xl px-3.5 py-2.5 text-left text-sm transition ${active ? "bg-[#edf5df] font-bold text-[#0b6b3a]" : "text-[#304736] hover:bg-[#f5f8f3]"}`}><span>{option.label}</span>{active ? <Check className="size-4" /> : null}</button>;
          })}
        </div>
      ) : null}
    </div>
  );
}
