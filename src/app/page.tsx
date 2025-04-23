"use client";
import Header from "./components/Header";
import Main from "./components/Main";

export default function Home() {
    return (
        <div className="flex flex-col items-center w-300 mx-auto border-2 rounded-lg overflow-hidden ">
            <Header />
            <Main />
            <footer></footer>
        </div>
    );
}
