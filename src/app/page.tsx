"use client";
import Link from "next/link";
import * as React from "react";
import { Button } from "../components/ui/Button";
import { Checkbox } from "../components/ui/Checkbox";
import { Card } from "../components/ui/Card";
import { Sparkles, Bell, Ticket, Users, Send } from "lucide-react";

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
    <div className="space-y-12 max-w-4xl mx-auto py-8 px-4 relative">
      
      {/* Top Header / Navigation Action Bar */}
      <div className="flex justify-end items-center w-full min-h-[40px] relative z-50">
        <div className="flex flex-row items-center gap-6">
          <Link href="/cart" passHref legacyBehavior>
           
              <button className="bg-black hover:bg-transparent text-white hover:text-red-500 border-2 border-[#eb0028] rounded-full h-10 px-5 text-[13px] font-bold tracking-widest transition-all duration-200 uppercase cursor-pointer shadow-lg shadow-red-600/20">
                Buy Now
              </button>
           
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center space-y-4 animate-scaleIn mt-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[#eb0028] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TEDxIITP 2026 is Coming Soon</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-100 to-neutral-500 bg-clip-text text-transparent">
          Ideas Worth <span className="text-[#eb0028]">Spreading</span>
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl max-w-xl mx-auto">
          An evening of inspiration, disruption, and forward-looking concepts, brought to you by thinkers and doers.
        </p>
      </div>

      {/* Grid of UI Demos / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Registration Card (Button & Checkbox Demos) */}
        <Card glow className="space-y-6">
          <div>
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <Ticket className="w-5 h-5 text-[#eb0028]" />
              <span>Get Updates & Pre-Register</span>
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              Be the first to know when tickets go live and speaker lineups are announced.
            </p>
          </div>

          {subscribed ? (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              ✨ Subscription successful! We've sent a verification email.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#eb0028] transition-colors duration-300 autofill:bg-transparent autofill:text-white"
                />
              </div>

              <Checkbox
                label="I agree to receive event notifications and newsletter updates"
                checked={acceptTerms}
                onCheckedChange={setAcceptTerms}
              />

              <Button
                type="submit"
                isLoading={btnLoading}
                disabled={!acceptTerms || !email}
                className="w-full justify-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Subscribe Now
              </Button>
            </form>
          )}
        </Card>

        {/* Buttons Style Showcase */}
        <Card glow className="space-y-6">
          <div>
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <Users className="w-5 h-5 text-[#eb0028]" />
              <span>UI Library Components</span>
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              Interactive demonstrations of built-in button styles and actions.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">
                Primary Button
              </Button>
              <Button variant="secondary">
                Secondary Button
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">
                Outline Action
              </Button>
              <Button variant="ghost">
                Ghost Link
              </Button>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5">
              <Button 
                variant="primary" 
                size="sm" 
                isLoading={btnLoading} 
                onClick={() => {
                  setBtnLoading(true);
                  setTimeout(() => setBtnLoading(false), 2000);
                }}
              >
                Trigger Loader
              </Button>
              <span className="text-xs text-neutral-400">
                Click to preview loading spin transition.
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}