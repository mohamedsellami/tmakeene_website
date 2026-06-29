"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DEFAULT_NAV_LINKS = [
  { href: "/guardian-sign-up", label: "الرئيسية" },
  { href: "/privacy-policy", label: "سياسة الخصوصية" },
  { href: "/terms-and-conditions", label: "الشروط والأحكام" },
] as const;

const FREELANCE_ENGLISH_HOME = "/freelance-english";

function useSiteNav() {
  const pathname = usePathname();
  const isFreelanceEnglish = pathname === FREELANCE_ENGLISH_HOME;

  if (isFreelanceEnglish) {
    return {
      homeHref: FREELANCE_ENGLISH_HOME,
      navLinks: [{ href: FREELANCE_ENGLISH_HOME, label: "الرئيسية" }] as const,
    };
  }

  return {
    homeHref: "/guardian-sign-up",
    navLinks: DEFAULT_NAV_LINKS,
  };
}

export default function GuardianSiteHeader() {
  const [open, setOpen] = useState(false);
  const { homeHref, navLinks } = useSiteNav();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-light-grey bg-off-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href={homeHref}
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/tafkira_logo_horizantal_midnight.svg"
            alt="تفكيرة"
            className="h-auto max-h-11 w-auto max-w-[200px] object-contain sm:max-h-12"
            width={200}
            height={48}
            decoding="async"
          />
        </Link>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="التنقل الرئيسي"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-semibold text-midnight-blue transition hover:text-primary-blue"
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-midnight-blue transition hover:bg-light-grey/40 md:hidden"
          aria-expanded={open}
          aria-controls="guardian-mobile-nav"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <div
          id="guardian-mobile-nav"
          className="fixed inset-x-0 top-[57px] bottom-0 z-40 bg-off-white md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="قائمة التنقل"
        >
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="التنقل">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-4 py-3 text-base font-semibold text-midnight-blue transition hover:bg-light-grey/50"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
