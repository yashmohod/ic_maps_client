"use client"
import Image from "next/image";
import { SignupForm } from "@/components/signup-form"
export default function SignupPage() {
  return (
    <div className="bg-background text-foreground flex w-full min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary   text-primary-foreground flex size-10 items-center justify-center rounded-md">
                        <Image
              src="/assets/ic_logo_up.png"
              alt="Ithaca College logo"
              width={160}
              height={40}
              className="max-h-10 w-auto dark:hidden"
            />
            <Image
              src="/assets/ic_logo_up_dark.png"
              alt="Ithaca College logo"
              width={160}
              height={40}
              className="hidden max-h-10 w-auto dark:block"
            />
          </div>
          Ithaca College Map
        </a>
        <SignupForm />
      </div>
    </div>
  )
}

