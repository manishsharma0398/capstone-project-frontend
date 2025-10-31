"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  CheckCircle,
  Heart,
} from "lucide-react";
import { Navbar } from "@/components/navbar";

const opportunitiesData: Record<
  string,
  {
    id: number;
    title: string;
    organization: string;
    location: string;
    date: string;
    time: string;
    category: string;
    impact: string;
    description: string;
    volunteersNeeded: number;
    volunteersApplied: number;
    fullDescription: string;
    requirements: string[];
    schedule: string;
    benefits: string[];
    status: string;
  }
> = {
  "1": {
    id: 1,
    title: "Community Garden Cleanup",
    organization: "Green Earth Initiative",
    location: "Downtown Park",
    date: "Nov 15, 2024",
    time: "9:00 AM - 12:00 PM",
    category: "Environmental",
    impact: "50+ hours needed",
    description:
      "Help us maintain and beautify our community garden while learning about sustainable practices.",
    volunteersNeeded: 15,
    volunteersApplied: 8,
    fullDescription:
      "Join Green Earth Initiative for a day of meaningful work at our community garden! This hands-on opportunity allows you to contribute directly to environmental sustainability and community beautification. Whether you're an experienced gardener or a complete beginner, we have tasks suited for all skill levels. You'll work alongside passionate volunteers and learn about organic gardening, composting, and sustainable living practices.",
    requirements: [
      "No experience necessary",
      "Able to do light to moderate physical activity",
      "Comfortable working outdoors",
      "Willing to learn",
    ],
    schedule:
      "One-time event on Nov 15, 2024 from 9:00 AM to 12:00 PM. No prior commitment needed.",
    benefits: [
      "Make a direct environmental impact",
      "Learn sustainable gardening practices",
      "Meet like-minded community members",
      "Free lunch provided",
      "Certificate of participation",
    ],
    status: "active",
  },
  "2": {
    id: 2,
    title: "Senior Fitness Classes",
    organization: "Active Living Foundation",
    location: "Community Center",
    date: "Nov 10, 2024",
    time: "2:00 PM - 3:30 PM",
    category: "Health & Wellness",
    impact: "Ongoing commitment",
    description:
      "Lead or assist with fun fitness activities designed for seniors to improve mobility and health.",
    volunteersNeeded: 5,
    volunteersApplied: 3,
    fullDescription:
      "The Active Living Foundation is seeking enthusiastic volunteers to assist with senior fitness classes. Whether you're a fitness instructor, nurse, or someone passionate about senior wellness, your contribution will help improve the health and quality of life for older adults in our community. Classes focus on low-impact exercises, balance training, and flexibility work tailored to seniors' needs.",
    requirements: [
      "Enthusiasm for helping seniors",
      "Ability to demonstrate exercises or provide support",
      "Patient and encouraging demeanor",
    ],
    schedule:
      "Ongoing commitment. Classes meet twice weekly. Flexible scheduling options available.",
    benefits: [
      "Help improve seniors' health and independence",
      "Develop coaching and mentoring skills",
      "Flexible schedule",
      "Training provided",
      "Building meaningful intergenerational connections",
    ],
    status: "active",
  },
  "3": {
    id: 3,
    title: "Youth Mentoring Program",
    organization: "Future Leaders Academy",
    location: "Various Locations",
    date: "Nov 12, 2024",
    time: "4:00 PM - 5:30 PM",
    category: "Education",
    impact: "12 weeks program",
    description:
      "Mentor high school students by sharing your skills and experience in a supportive one-on-one setting.",
    volunteersNeeded: 20,
    volunteersApplied: 12,
    fullDescription:
      "Make a lasting impact on young lives through one-on-one mentoring with Future Leaders Academy. You'll be paired with a high school student and meet regularly to provide academic support, career guidance, and personal mentorship. Mentors come from diverse backgrounds and professions, all united by a desire to help youth reach their potential.",
    requirements: [
      "Commitment to 12-week program",
      "Willingness to meet weekly",
      "Strong communication skills",
      "Background check required",
    ],
    schedule:
      "12-week commitment. Weekly meetings (1-1.5 hours). Schedule is flexible based on mentor and student availability.",
    benefits: [
      "Change a young person's trajectory",
      "Share your professional experience",
      "Develop leadership skills",
      "Training and support provided",
      "Networking with other mentors",
    ],
    status: "active",
  },
  "4": {
    id: 4,
    title: "Food Bank Assistance",
    organization: "Community Food Bank",
    location: "Main Street Warehouse",
    date: "Nov 18, 2024",
    time: "10:00 AM - 1:00 PM",
    category: "Social Services",
    impact: "Help feed 200+ families",
    description:
      "Sort, package, and distribute food to families in need within our community.",
    volunteersNeeded: 25,
    volunteersApplied: 18,
    fullDescription:
      "The Community Food Bank is looking for dedicated volunteers to help sort, pack, and distribute food to families experiencing food insecurity. Your work directly addresses hunger in our community and ensures families have access to nutritious meals. No experience necessary - we'll train you on all tasks.",
    requirements: [
      "No experience needed",
      "Able to lift up to 25 pounds",
      "Comfortable working in a warehouse environment",
    ],
    schedule:
      "Flexible scheduling. Choose from morning, afternoon, or full-day shifts.",
    benefits: [
      "Direct impact on food security",
      "Meet passionate community members",
      "Team-oriented work environment",
      "Refreshments provided",
      "Volunteer certificate",
    ],
    status: "active",
  },
  "5": {
    id: 5,
    title: "Animal Shelter Support",
    organization: "Paws & Love Animal Rescue",
    location: "Animal Shelter",
    date: "Nov 20, 2024",
    time: "1:00 PM - 4:00 PM",
    category: "Animal Welfare",
    impact: "Care for 50+ animals",
    description:
      "Help care for rescued animals by feeding, walking, and socializing them to prepare for adoption.",
    volunteersNeeded: 12,
    volunteersApplied: 7,
    fullDescription:
      "Paws & Love Animal Rescue provides shelter and care for abandoned and rescued animals. We're seeking compassionate volunteers to help care for our residents. Tasks include walking dogs, socializing cats and other animals, feeding, and cleaning. Your work directly helps prepare animals for their forever homes.",
    requirements: [
      "Animal lover",
      "Comfortable with animals",
      "Able to do physical activity",
      "Patient and gentle demeanor",
    ],
    schedule:
      "Flexible. Choose shifts that work for you. Full-day or partial-day options available.",
    benefits: [
      "Make animal lives better",
      "Contribute to adoptions",
      "Work with passionate animal lovers",
      "Free training",
      "Great volunteer community",
    ],
    status: "active",
  },
  "6": {
    id: 6,
    title: "Beach Cleanup Drive",
    organization: "Ocean Guardians",
    location: "Santa Monica Beach",
    date: "Nov 16, 2024",
    time: "8:00 AM - 11:00 AM",
    category: "Environmental",
    impact: "Remove tons of plastic",
    description:
      "Join us in cleaning our beaches and protecting marine life from pollution.",
    volunteersNeeded: 40,
    volunteersApplied: 28,
    fullDescription:
      "Ocean Guardians organizes monthly beach cleanup events to protect our marine ecosystems. We provide supplies and tools. Your effort directly removes pollution that threatens marine life and our environment. No experience needed - just bring your passion for the ocean!",
    requirements: [
      "Willingness to work outdoors",
      "Comfortable with moderate physical activity",
      "No experience needed",
    ],
    schedule:
      "One-time event. Early morning to mid-morning. Plan for 3 hours of work.",
    benefits: [
      "Protect marine ecosystems",
      "See immediate environmental impact",
      "Community beach celebration after cleanup",
      "Free breakfast and refreshments",
      "Photos and certificate provided",
    ],
    status: "active",
  },
};

export default function OpportunityDetailsPage() {
  const params = useParams();
  const opportunityId = params.id as string;
  const opportunity = opportunitiesData[opportunityId];
  const [hasApplied, setHasApplied] = useState(false);

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/listings"
            className="flex items-center gap-2 text-primary hover:underline mb-6"
          >
            <ArrowLeft size={20} />
            Back to Listings
          </Link>
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">Opportunity not found.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/listings"
          className="flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ArrowLeft size={20} />
          Back to Listings
        </Link>

        <div className="space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">
                      {opportunity.title}
                    </h1>
                    <Badge>{opportunity.category}</Badge>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    {opportunity.organization}
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={() => setHasApplied(!hasApplied)}
                  variant={hasApplied ? "outline" : "default"}
                  className="flex items-center gap-2"
                >
                  <Heart
                    size={20}
                    fill={hasApplied ? "currentColor" : "none"}
                  />
                  {hasApplied ? "Applied" : "Apply Now"}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Key Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">When</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-primary" />
                  <div>
                    <p className="font-medium text-foreground">
                      {opportunity.date}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {opportunity.time}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Where</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-primary" />
                  <p className="text-foreground">{opportunity.location}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Full Description */}
          <Card>
            <CardHeader>
              <CardTitle>About This Opportunity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                {opportunity.fullDescription}
              </p>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Users size={18} className="text-primary" />
                <span className="text-sm font-medium">
                  {opportunity.volunteersNeeded} volunteers needed •{" "}
                  {opportunity.volunteersApplied} already applied
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {opportunity.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle
                      size={18}
                      className="text-primary mt-1 flex-shrink-0"
                    />
                    <span className="text-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">
                {opportunity.schedule}
              </p>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>What You&apos;ll Gain</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {opportunity.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Heart
                      size={18}
                      className="text-accent mt-1 flex-shrink-0"
                    />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Application Status */}
          {hasApplied && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6 flex items-center gap-4">
                <CheckCircle size={32} className="text-green-600" />
                <div>
                  <p className="font-semibold text-green-900">
                    You&apos;ve applied for this opportunity!
                  </p>
                  <p className="text-sm text-green-800">
                    The organization will review your application and get back
                    to you soon.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <div className="flex gap-4">
            <Button
              size="lg"
              onClick={() => setHasApplied(true)}
              className="flex-1"
              disabled={hasApplied}
            >
              {hasApplied
                ? "Application Submitted"
                : "Apply for This Opportunity"}
            </Button>
            <Link href="/listings" className="flex-1">
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-transparent"
              >
                See Other Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
