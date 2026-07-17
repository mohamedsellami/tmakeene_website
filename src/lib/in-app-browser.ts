const IN_APP_PATTERNS = [
  /Instagram/i,
  /FBAN|FBAV|Facebook/i,
  /Twitter/i,
  /LinkedInApp/i,
  /Snapchat/i,
  /TikTok|musical_ly/i,
  /Line\//i,
  /MicroMessenger/i,
  /; wv\)/i,
];

export function isInAppBrowser(userAgent: string): boolean {
  return IN_APP_PATTERNS.some((pattern) => pattern.test(userAgent));
}

export function openInExternalBrowser(url: string): void {
  const normalizedUrl = url.replace(/\/$/, "");
  const ua = navigator.userAgent || navigator.vendor || "";
  const inApp = isInAppBrowser(ua);

  if (inApp && /android/i.test(ua)) {
    const path = normalizedUrl.replace(/^https?:\/\//, "");
    window.location.href = `intent://${path}#Intent;scheme=https;package=com.android.chrome;end`;
    window.setTimeout(() => {
      window.location.href = normalizedUrl;
    }, 700);
    return;
  }

  if (inApp && /iPad|iPhone|iPod/i.test(ua)) {
    const path = normalizedUrl.replace(/^https?:\/\//, "");
    window.location.href = `x-safari-https://${path}`;
    window.setTimeout(() => {
      window.location.href = normalizedUrl;
    }, 700);
    return;
  }

  // Already in a real browser — navigate once in the same tab.
  window.location.assign(normalizedUrl);
}
