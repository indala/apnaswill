import Link from "next/link";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-zinc-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="h-8 w-8 rounded bg-maroon flex items-center justify-center text-gold font-bold">A</div>
               <span className="font-bold text-gray-900 tracking-tight">Admin <span className="text-maroon">Panel</span></span>
            </div>
            <div className="flex items-center gap-6">
               <Link href="/" className="text-xs font-bold text-gray-400 hover:text-maroon uppercase tracking-widest">Back to Website</Link>
               <div className="h-8 w-8 rounded-full bg-zinc-100 border border-gray-200"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="py-6 border-t border-gray-200 bg-white">
        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          APNAS Will Dashboard &bull; Secure Access
        </p>
      </footer>
    </div>
  );
}
