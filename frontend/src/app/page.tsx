import { Aside } from "@/widget/aside";
import { Footer } from "@/widget/footer";
import { Header } from "@/widget/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col-reverse md:flex-row gap-5">
        <Aside />
      </main>
      <Footer />
    </>
  );
}
