export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07111f] px-4 py-8 text-center text-sm text-slate-400 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-semibold text-white">KORYXA Formation</p>
        <p>© {new Date().getFullYear()} KORYXA Tech Store — Formation Python Data.</p>
      </div>
    </footer>
  );
}
