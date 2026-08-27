import Image from "next/image";

const blocks = Array.from({ length: 6 });

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#fffdf8] text-[#17341f]" role="status" aria-label="Loading page">
      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto flex min-h-[82px] max-w-[1180px] items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <Image src="/rani-tours-icon.svg" alt="" width={52} height={52} priority />
            <div><div className="h-4 w-28 animate-pulse rounded bg-[#e8eee3]"/><div className="mt-2 h-2.5 w-20 animate-pulse rounded bg-[#eef2ea]"/></div>
          </div>
          <div className="hidden gap-3 lg:flex">{Array.from({length:6}).map((_,i)=><div key={i} className="h-3 w-16 animate-pulse rounded bg-[#eef2ea]"/>)}</div>
          <div className="h-10 w-28 animate-pulse rounded-full bg-[#e8eee3]"/>
        </div>
      </div>

      <main>
        <section className="bg-[#f5f1e8] py-10 sm:py-14">
          <div className="mx-auto grid max-w-[1180px] gap-8 px-4 lg:grid-cols-[1fr_360px]">
            <div className="space-y-5">
              <div className="h-4 w-24 animate-pulse rounded bg-[#dfe7d9]"/>
              <div className="h-12 max-w-xl animate-pulse rounded-xl bg-[#dfe7d9]"/>
              <div className="h-5 max-w-md animate-pulse rounded bg-[#e7ece3]"/>
              <div className="h-5 max-w-lg animate-pulse rounded bg-[#e7ece3]"/>
              <div className="mt-7 flex gap-3"><div className="h-11 w-32 animate-pulse rounded-xl bg-[#d9e5d4]"/><div className="h-11 w-28 animate-pulse rounded-xl bg-[#e9e7df]"/></div>
            </div>
            <div className="h-72 animate-pulse rounded-[24px] border border-[#e3e1d8] bg-white shadow-sm"/>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-[1180px] px-4">
            <div className="mx-auto h-4 w-28 animate-pulse rounded bg-[#e5ebdf]"/>
            <div className="mx-auto mt-3 h-9 w-80 max-w-full animate-pulse rounded-lg bg-[#e5ebdf]"/>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{blocks.map((_,i)=><div key={i} className="overflow-hidden rounded-2xl border border-[#e5e2da] bg-white"><div className="h-36 animate-pulse bg-[#edf1e9]"/><div className="space-y-3 p-5"><div className="h-5 w-2/3 animate-pulse rounded bg-[#e3e9de]"/><div className="h-3 w-full animate-pulse rounded bg-[#eef1eb]"/><div className="h-3 w-4/5 animate-pulse rounded bg-[#eef1eb]"/></div></div>)}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
