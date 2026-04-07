export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh flex-col bg-midnight-blue text-off-white antialiased">
      {children}
    </div>
  );
}
