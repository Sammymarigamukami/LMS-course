import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image";
import download from "@/public/download.png";

export default function AuthLayout({ children }: { children:ReactNode }) {
    return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <Link
      href="/"
      className={buttonVariants({ variant: "outline",
        className: "absolute left-4 top-4",
       })}
      >
        <ArrowLeft/> Back
      </Link>
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link 
          className="flex items-center gap-2 self-center font-medium"
          href="/"
          >
            <Image src={download} alt="logo" width={52} height={52}/>
            SamLMS.
          </Link>
          {children}
          <div className="text-balance text-center text-xs text-muted-foreground">
            By clicking continue, you agree to our <span className="hover:text-primary hover:underline">Term of service</span>
            {" "}and <span className="hover:text-primary hover:underline">Privacy Policy</span>.
          </div>
        </div>
    </div>
  );
}