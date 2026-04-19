"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useCallback, useEffect, useState } from "react";

function trackSharePurchaseLink(params: {
  action: string;
  entry?: string;
  channel?: string;
}) {
  sendGAEvent("event", "share_purchase_link", {
    action: params.action,
    ...(params.entry ? { entry: params.entry } : {}),
    ...(params.channel ? { channel: params.channel } : {}),
    page_path: "/how-to-get-access-code",
  });
}

const SHARE_PATH = "/guardian-sign-up";

function getShareUrl(): string {
  const envBase =
    typeof process.env.NEXT_PUBLIC_SITE_URL === "string"
      ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
      : "";
  if (typeof window === "undefined") {
    return envBase ? `${envBase}${SHARE_PATH}` : SHARE_PATH;
  }
  const origin = envBase || window.location.origin;
  return `${origin}${SHARE_PATH}`;
}

const SHARE_TITLE = "التسجيل كولي أمر — تمكين";
const SHARE_TEXT =
  "تطبيق تمكين سيساعدني في مراجعة الرياضيات، اضغط هنا لأواصل المراجعة:";

function buildSharePayload(url: string) {
  const fullText = `${SHARE_TEXT}\n${url}`;
  return {
    fullText,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(fullText)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(SHARE_TEXT)}`,
    viber: `viber://forward?text=${encodeURIComponent(fullText)}`,
    sms: `sms:?body=${encodeURIComponent(fullText)}`,
    messenger: `fb-messenger://share/?link=${encodeURIComponent(url)}`,
  };
}

function tryOpenAppUrl(href: string) {
  window.location.href = href;
}

export default function SharePurchaseLinkButton() {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetAlert, setSheetAlert] = useState<string | null>(null);

  const showFeedback = useCallback((message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 3500);
  }, []);

  const closeSheet = useCallback(() => {
    setSheetOpen(false);
    setSheetAlert(null);
  }, []);

  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSheet();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [sheetOpen, closeSheet]);

  const openAppPicker = useCallback(
    (entry: "primary_fallback" | "direct_picker_link") => {
      setSheetAlert(null);
      setSheetOpen(true);
      trackSharePurchaseLink({ action: "sheet_opened", entry });
    },
    [],
  );

  const handlePrimaryClick = useCallback(async () => {
    trackSharePurchaseLink({ action: "primary_share_click" });
    const url = getShareUrl();

    if (typeof navigator.share === "function") {
      const full: ShareData = {
        title: SHARE_TITLE,
        text: `${SHARE_TEXT}\n${url}`,
        url,
      };
      const urlOnly: ShareData = { url };

      const attempts: ShareData[] = [];
      if (typeof navigator.canShare !== "function") {
        attempts.push(full, urlOnly);
      } else {
        if (navigator.canShare(full)) attempts.push(full);
        if (navigator.canShare(urlOnly)) attempts.push(urlOnly);
        if (attempts.length === 0) attempts.push(full, urlOnly);
      }

      for (const data of attempts) {
        try {
          await navigator.share(data);
          trackSharePurchaseLink({ action: "native_share_completed" });
          return;
        } catch (err) {
          if (err instanceof DOMException && err.name === "AbortError") {
            return;
          }
        }
      }
    }

    openAppPicker("primary_fallback");
  }, [openAppPicker]);

  const handleCopy = useCallback(async () => {
    const url = getShareUrl();
    const fullText = `${SHARE_TEXT}\n${url}`;
    setSheetAlert(null);
    try {
      await navigator.clipboard.writeText(fullText);
      trackSharePurchaseLink({ action: "channel_chosen", channel: "copy" });
      closeSheet();
      showFeedback("تم نسخ النص. الصقه في أي تطبيق تريد.");
    } catch {
      setSheetAlert(
        "تعذر النسخ تلقائياً من هذا المتصفح. جرّب واتساب أو تيليجرام أدناه، أو انسخ الرابط يدوياً من شريط العنوان.",
      );
    }
  }, [closeSheet, showFeedback]);

  const url = typeof window !== "undefined" ? getShareUrl() : "";
  const links = url ? buildSharePayload(url) : null;

  return (
    <div className="w-full max-w-md">
      <button
        type="button"
        onClick={handlePrimaryClick}
        className="flex w-full flex-row items-center justify-center gap-2 rounded-[10px] bg-midnight-blue px-4 py-3.5 text-white shadow-sm transition hover:opacity-95 active:opacity-90"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/icons/share.svg"
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 shrink-0 object-contain"
        />
        <span className="text-center text-base font-bold leading-snug">
          شارك رابط الشراء مع ولي أمرك
        </span>
      </button>
      <button
        type="button"
        onClick={() => openAppPicker("direct_picker_link")}
        className="mt-3 w-full text-center text-sm font-medium text-grey underline-offset-2 transition hover:text-primary-text hover:underline"
      >
        اختر تطبيقاً للمشاركة (ماسنجر، واتساب، تيليجرام…)
      </button>
      {feedback && !sheetOpen ? (
        <p
          className="mt-3 text-center text-sm text-grey"
          role="status"
          aria-live="polite"
        >
          {feedback}
        </p>
      ) : null}

      {sheetOpen && links ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/45"
            aria-label="إغلاق"
            onClick={closeSheet}
          />
          <div
            className="relative z-10 w-full max-w-md rounded-t-2xl bg-white p-4 shadow-xl sm:rounded-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-sheet-title"
          >
            <h2
              id="share-sheet-title"
              className="mb-1 text-center text-lg font-bold text-midnight-blue"
            >
              مشاركة الرابط
            </h2>
            <p className="mb-4 text-center text-sm text-grey">
              اختر التطبيق أو انسخ الرابط والصقه يدوياً.
            </p>
            {sheetAlert ? (
              <p
                className="mb-3 rounded-[10px] border border-cardinal/25 bg-cardinal/10 px-3 py-2.5 text-center text-sm font-semibold leading-relaxed text-cardinal"
                role="alert"
                aria-live="assertive"
              >
                {sheetAlert}
              </p>
            ) : null}
            <ul className="flex flex-col gap-2">
              <li>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full rounded-[10px] border border-light-grey bg-off-white px-4 py-3 text-center text-base font-semibold text-primary-text transition hover:bg-white"
                >
                  نسخ الرابط والنص
                </button>
              </li>
              <li>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-[10px] border border-light-grey bg-off-white px-4 py-3 text-center text-base font-semibold text-primary-text transition hover:bg-white"
                  onClick={() => {
                    trackSharePurchaseLink({
                      action: "channel_chosen",
                      channel: "whatsapp",
                    });
                    closeSheet();
                  }}
                >
                  واتساب
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    trackSharePurchaseLink({
                      action: "channel_chosen",
                      channel: "messenger",
                    });
                    tryOpenAppUrl(links.messenger);
                    closeSheet();
                  }}
                  className="w-full rounded-[10px] border border-light-grey bg-off-white px-4 py-3 text-center text-base font-semibold text-primary-text transition hover:bg-white"
                >
                  ماسنجر
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    trackSharePurchaseLink({
                      action: "channel_chosen",
                      channel: "viber",
                    });
                    tryOpenAppUrl(links.viber);
                    closeSheet();
                  }}
                  className="w-full rounded-[10px] border border-light-grey bg-off-white px-4 py-3 text-center text-base font-semibold text-primary-text transition hover:bg-white"
                >
                  فيبر
                </button>
              </li>
              <li>
                <a
                  href={links.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-[10px] border border-light-grey bg-off-white px-4 py-3 text-center text-base font-semibold text-primary-text transition hover:bg-white"
                  onClick={() => {
                    trackSharePurchaseLink({
                      action: "channel_chosen",
                      channel: "telegram",
                    });
                    closeSheet();
                  }}
                >
                  تيليجرام
                </a>
              </li>
              <li>
                <a
                  href={links.sms}
                  className="block w-full rounded-[10px] border border-light-grey bg-off-white px-4 py-3 text-center text-base font-semibold text-primary-text transition hover:bg-white"
                  onClick={() => {
                    trackSharePurchaseLink({
                      action: "channel_chosen",
                      channel: "sms",
                    });
                    closeSheet();
                  }}
                >
                  رسالة نصية (SMS)
                </a>
              </li>
            </ul>
            <button
              type="button"
              onClick={closeSheet}
              className="mt-3 w-full rounded-[10px] py-3 text-center text-base font-medium text-grey"
            >
              إلغاء
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
