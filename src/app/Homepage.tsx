"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">
            Community Connect
          </div>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Connect to Make a Difference
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Find meaningful volunteer opportunities, connect with organizations in
          your community, and create real impact together.
        </p>
        <div className="space-x-4">
          <Link href="/auth/register?role=volunteer">
            <Button className="text-lg px-8 py-6">I Want to Volunteer</Button>
          </Link>
          <Link href="/auth/register?role=organization">
            <Button
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent"
            >
              I Represent an Organization
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
