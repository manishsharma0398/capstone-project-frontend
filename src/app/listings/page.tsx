"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Search } from "lucide-react";
import { Navbar } from "@/components/navbar";

const allOpportunitiesData = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

export default function ListingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "Environmental",
    "Health & Wellness",
    "Education",
    "Social Services",
    "Animal Welfare",
  ];

  const filteredOpportunities = allOpportunitiesData.filter((opportunity) => {
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.organization
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      opportunity.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || opportunity.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Volunteer Opportunities
          </h1>
          <p className="text-muted-foreground">
            Find meaningful ways to contribute to your community
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                placeholder="Search by title, organization, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.map((opportunity) => (
              <Card
                key={opportunity.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">
                          {opportunity.title}
                        </h3>
                        <Badge variant="secondary">
                          {opportunity.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {opportunity.organization}
                      </p>
                      <p className="text-sm text-foreground mb-4 line-clamp-2">
                        {opportunity.description}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin size={16} />
                          {opportunity.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock size={16} />
                          {opportunity.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users size={16} />
                          {opportunity.volunteersNeeded} volunteers needed
                        </div>
                      </div>

                      <Badge className="bg-primary/10 text-primary">
                        {opportunity.impact}
                      </Badge>
                    </div>

                    <Link href={`/listings/${opportunity.id}`}>
                      <Button>View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground mb-4">
                  No opportunities found matching your search.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Summary */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Showing {filteredOpportunities.length} of{" "}
            {allOpportunitiesData.length} opportunities
          </p>
        </div>
      </main>
    </div>
  );
}
