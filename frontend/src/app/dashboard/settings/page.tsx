import { SettingsForm } from "@/features/user";
import { Footer } from "@/widget/footer";
import { Header } from "@/widget/header";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Настройки профиля",
};

export default function SettingsPage() {
  return (
    <>
      <Header />
      <main className="h-svh flex items-center justify-center">
        <SettingsForm />
      </main>

      <Footer />
    </>
  );
}
