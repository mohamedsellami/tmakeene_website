"use client";

import { useEffect, useState } from "react";
import { isInAppBrowser, openInExternalBrowser } from "@/lib/in-app-browser";

type OpenInBrowserButtonProps = {
  appUrl: string;
  label?: string;
};

export default function OpenInBrowserButton({
  appUrl,
  label = "افتح التطبيق",
}: OpenInBrowserButtonProps) {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setShowHint(isInAppBrowser(navigator.userAgent));
  }, []);

  function handleClick() {
    openInExternalBrowser(appUrl);
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      {showHint ? (
        <div
          className="mb-4 rounded-[10px] border border-warm-amber/40 bg-warm-amber/15 px-4 py-3 text-right text-sm leading-relaxed text-off-white"
          role="status"
        >
          <p className="font-bold">أنت داخل متصفح التطبيق (إنستغرام، فيسبوك...)</p>
          <p className="mt-1 font-medium text-off-white/90">
            اضغط الزر أدناه لفتح تفكيرة في متصفحك الأساسي حتى لا تفقد تقدمك
            عند الإغلاق.
          </p>
          <p className="mt-2 text-xs text-off-white/75">
            إذا لم يفتح تلقائياً: ⋮ ثم «فتح في المتصفح» أو «Open in Browser».
          </p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={handleClick}
        className="inline-flex w-full items-center justify-center rounded-[10px] bg-classic-blue-green px-4 py-3.5 text-base font-bold text-off-white shadow-sm transition hover:opacity-95 active:opacity-90 sm:text-lg"
      >
        {label}
      </button>
    </div>
  );
}
