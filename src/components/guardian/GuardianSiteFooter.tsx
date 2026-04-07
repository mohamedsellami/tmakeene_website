import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/guardian-sign-up", label: "الرئيسية" },
  { href: "/privacy-policy", label: "سياسة الخصوصية" },
  { href: "/terms-and-conditions", label: "الشروط والأحكام" },
] as const;

export default function GuardianSiteFooter() {
  return (
    <footer className="border-t border-midnight-blue/20 bg-midnight-blue text-off-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo_white_arabic_horizontal.svg"
            alt="تمكين"
            className="h-auto max-h-12 w-auto max-w-[240px] object-contain opacity-95"
            width={240}
            height={48}
            decoding="async"
          />
          <p className="max-w-xl text-sm leading-relaxed text-off-white/90">
            تمكين تطبيق تعليمي يقدّم مسارات تعلّم تفاعلية ومنظّمة، مدعومة بشرح
            أساتذة، لمساعدة المتعلمين على الفهم والتقدّم.
          </p>
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-6">
            {FOOTER_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm font-medium text-off-white underline-offset-4 transition hover:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm">
            <a
              href="mailto:tamkeene@gmail.com"
              className="font-medium text-off-white underline-offset-4 transition hover:underline"
            >
              tamkeene@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
