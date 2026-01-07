"use client";
import { useAppTheme } from "@/hooks/use-app-theme";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";
export default function LoginPage() {
  const { isDark } = useAppTheme();
  return (
    <div className="bg-muted flex min-h-svh flex-col w-full items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-md">
            <Image
              src={
                isDark
                  ? "/assets/ic_logo_up_dark.png"
                  : "/assets/ic_logo_up.png"
              }
              alt="Ithaca College logo"
              width={160}
              height={40}
              className="max-h-10 w-auto"
            />
          </div>
          Ithaca College Map
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
