import { React } from 'react';
import { useState, useEffect } from "react";
import logo from '../../assets/Logo.svg';
import Features from "../Features/Features";
import Pricing from "../Pricing/Pricing";
import CTA from "../CTA/CTA";
import Footer from "../Footer/Footer";
import Input from "../Home/Input";
import { useNavigate } from "react-router";

export default () => {

    const navigate = useNavigate();

    const [state, setState] = useState(false)

    const navigation = [
        { title: "Features", path: "/#Features" },
        { title: "Pricing", path: "/#Pricing" }
    ]


    const Brand = () => (
        <div className="flex items-center justify-between py-5 md:block">
            <a href="javascript:void(0)">
                <img
                    src={logo}
                    className="pt-[10px] h-[100px] w-[150px]"
                    alt="Shorty-URL logo"
                />
            </a>
            <div className="md:hidden">
                <button className="menu-btn text-gray-400 hover:text-gray-300"
                    onClick={() => setState(!state)}
                >
                    {
                        state ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )
                    }
                </button>
            </div>
        </div>
    )

    return (
      <div className="scroll-smooth">
        <div className="bg-elite-black h-screen">
            <header>
                <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}>
                    <Brand />
                </div>
                <nav className={`pb-5 md:text-sm ${state ? "absolute z-20 top-0 inset-x-0 bg-gray-800 rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:relative md:bg-transparent" : ""}`}>
                    <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                        <Brand />
                        <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                            <ul className="flex-1 justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                                {
                                    navigation.map((item, idx) => {
                                        return (
                                            <li key={idx} className="text-gray-300 hover:text-gray-400">
                                                <a href={item.path} className="block">
                                                    {item.title}
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                                
                                <li className="mt-4 lg:mt-0">
                                <a href="/SignUp" className="flex items-center py-3 px-4 text-center border text-white hover:text-sky-600 rounded-md block lg:inline lg:border-0">
                                    Sign Up
                                </a>
                            </li>
                            <li>
                                <a href="/LogIn" className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-full md:inline-flex">
                                    Log In
                                </a>
                            </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <section className="relative">
                <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8">
                    <div className="space-y-5 max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl text-white font-extrabold mx-auto md:text-5xl">
                        Shorten Your Loooong Links :)
                        </h2>
                        <p className="max-w-2xl mx-auto text-gray-400">
                        An efficient and easy-to-use URL Shortening service that streamlines your online experience.
                        </p>
                        <div className="py-28">
                        <form className="justify-center items-center gap-x-3 sm:flex">
                            <input
                                className="shadow border-[4px] border-gray-700 rounded-full py-4 px-3 text-lite-gray bg-dark-gray focus:shadow-outline w-[600px]"
                                id="username"
                                type="text"
                                placeholder="Enter your link here"
                            />
                            <button onClick={() => (navigate('/LogIn'))} className="bg-sky-500 h-[50px] w-[150px] hover:bg-sky-400 text-white font-bold py-2 px-4 rounded-full -ml-[168px] active:bg-sky-600 duration-150">
                                Shorten Now!
                            </button>
                            </form>
                        </div>
                        
                    </div>
                </div>

                <div className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg" style={{ background: "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)" }}></div>
            
            </section>
            {/* <Stats /> */}
        </div>
        <Features />
        <Pricing />
        <CTA />
        <Footer />
        </div>
    )
}