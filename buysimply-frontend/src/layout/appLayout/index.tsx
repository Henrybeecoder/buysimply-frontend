import Header from "../../components/header"
export default function AppLayout({children}) {
    return (
        <div>
           <Header />
           <div className="lg:px-10 px-3">
           {children}
           </div>
         
        </div>
    )
}