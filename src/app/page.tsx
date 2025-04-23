"use client";
import Header from "./components/Header";
import Main from "./components/Main";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center w-300 mx-auto border-2 rounded-lg overflow-hidden ">
            <Header />
            <Main />
            <footer></footer>
        </div>
    );
}
