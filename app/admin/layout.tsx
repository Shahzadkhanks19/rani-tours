import type { Metadata } from "next";

export const metadata:Metadata={title:{default:"Admin",template:"%s | Rani Tours Admin"},robots:{index:false,follow:false,nocache:true,noarchive:true,nosnippet:true,noimageindex:true}};
export default function AdminLayout({children}:{children:React.ReactNode}){return children;}
