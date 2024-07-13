import Link from "next/link";
import Logo from "./(routes)/_components/logo";
import { Button } from "@/components/ui/button";
import {  auth, UserButton } from "@clerk/nextjs";

const HomeLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { userId } = auth();
  return ( 
    <div className="h-full">
        <header className="w-full h-16 flex justify-between items-center px-8 border-b-2 ">
          <Logo/>
          <nav className="flex items-center gap-x-2">
            <Button variant="link" size="lg">
              <Link href="/dashboard">
                DashBoard
              </Link>
            </Button>
            <Button variant="link" size="lg">
              <Link href="/internship">
                Internship
              </Link>
            </Button>
            {userId ? 
              <UserButton
                afterSignOutUrl="/"
              /> : 
              <div className="flex gap-x-4 items-center">
                <Link href="/sign-in">
                  <Button size="sm" variant="ghost">
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm" variant="default">
                    Sign Up
                  </Button>
                </Link>
              </div>
            }
          </nav>
        </header>
      <main className="">
        {children}
      </main>
    </div>
   );
}
 
export default HomeLayout;