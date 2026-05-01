export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="no-scrollbar overflow-autoflex flex w-full items-center justify-center p-4">
      {children}
    </main>
  );
}
