import { Footer } from "@/widget/footer";
import { Header } from "@/widget/header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center h-svh px-5">{children}</main>
      <Footer />
    </>
  );
}
