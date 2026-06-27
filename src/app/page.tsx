"use client";
import * as React from "react";
import { Button } from "../components/ui/Button";
import { Checkbox } from "../components/ui/Checkbox";
import { Card } from "../components/ui/Card";
import { Sparkles, Bell, Ticket, Users, Send } from "lucide-react";
import Link from "next/link";
import HeroHome from "@/src/features/components/home/heroHome";
import BuyTickets from "../features/components/home/buyTickects";
import LogoLoopSection from "../features/components/home/LogoLoopSection";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AboutTheTheme from "../features/components/home/aboutTheTheme";
import SpeakerHome from "../features/components/home/speakerhome";

export default function IndexPage() {
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !acceptTerms) return;

    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
      setSubscribed(true);
      setEmail("");
    }, 1500);
  };

  return (

    <main
      className="h-auto bg-cover bg-center bg-no-repeat"
    >
    <section className="relative h-auto overflow-hidden">
    <HeroHome/>
     </section>
     <AboutTheTheme/>
     <SpeakerHome/>
     <BuyTickets/>
    </main>
  );
}