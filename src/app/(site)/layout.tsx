import GuardianSiteFooter from "@/components/guardian/GuardianSiteFooter";
import GuardianSiteHeader from "@/components/guardian/GuardianSiteHeader";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <GuardianSiteHeader />
      <main className="flex-1">{children}</main>
      <GuardianSiteFooter />
    </div>
  );
}
