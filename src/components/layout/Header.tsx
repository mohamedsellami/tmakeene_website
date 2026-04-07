import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-light-grey bg-off-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="text-xl font-semibold text-midnight-blue transition hover:text-primary-blue"
        >
          Tamkeene
        </Link>
        <nav className="flex items-center gap-6" aria-label="Main navigation">
          {/* Add nav links here when needed */}
        </nav>
      </div>
    </header>
  );
}
