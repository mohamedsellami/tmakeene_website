export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-light-grey bg-off-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-grey">
            © {currentYear} Tamkeene. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-grey transition hover:text-primary-text"
            >
              الخصوصية
            </a>
            <a
              href="#"
              className="text-grey transition hover:text-primary-text"
            >
              الشروط
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
