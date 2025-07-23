import Header from "../../components/header"
import type { ReactNode } from "react";
interface AppLayoutProps {
  children: ReactNode;
}
export default function AppLayout({children}: AppLayoutProps) {
    return (
        <div>
           <Header />
           <div className="lg:px-10 px-3">
           {children}
           </div>
         
        </div>
    )
}