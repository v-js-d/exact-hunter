export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='mx-auto flex h-full w-full max-w-125 flex-col items-center justify-center'>
      {children}
    </div>
  );
}
