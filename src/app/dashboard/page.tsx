"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, AlertCircle, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/navbar";

const opportunitiesData = [
  {
    id: 1,
    title: "Community Garden Cleanup",
    organization: "Green Earth Initiative",
    location: "Downtown Park",
    date: "Nov 15, 2024",
    time: "9:00 AM - 12:00 PM",
    category: "Environmental",
    impact: "50+ hours needed",
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
  },
];

const applicationsData = [
  {
    id: 1,
    title: "Community Garden Cleanup",
    status: "accepted",
    appliedDate: "Nov 1, 2024",
    eventDate: "Nov 15, 2024",
  },
  {
    id: 2,
    title: "Senior Fitness Classes",
    status: "pending",
    appliedDate: "Nov 3, 2024",
    eventDate: "Nov 10, 2024",
  },
  {
    id: 3,
    title: "Food Bank Assistance",
    status: "rejected",
    appliedDate: "Oct 28, 2024",
    eventDate: "Nov 5, 2024",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("opportunities");
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle size={16} />;
      case "pending":
        return <Clock size={16} />;
      case "rejected":
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, Volunteer!
            </h1>
            <p className="text-muted-foreground">
              Track your opportunities and applications
            </p>
          </div>
          <Link href="/dashboard/profile">
            <Button>Edit Profile</Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24 hrs</div>
              <p className="text-xs text-muted-foreground">+2 hrs this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Active Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                1 pending approval
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Impact Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85</div>
              <p className="text-xs text-muted-foreground">
                Rising contributor
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="opportunities">
              Browse Opportunities
            </TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Opportunities</CardTitle>
                <CardDescription>
                  Find and apply to opportunities that match your interests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {opportunitiesData.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {opportunity.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {opportunity.organization}
                      </p>
                      <div className="flex flex-wrap gap-3 mb-3">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin size={16} />
                          {opportunity.location}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock size={16} />
                          {opportunity.date}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users size={16} />
                          {opportunity.impact}
                        </div>
                      </div>
                      <Badge variant="secondary">{opportunity.category}</Badge>
                    </div>
                    <Button variant="outline" className="ml-4 bg-transparent">
                      Apply
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
                <CardDescription>
                  Track the status of your volunteer applications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {applicationsData.map((application) => (
                  <div
                    key={application.id}
                    className="flex items-start justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">
                          {application.title}
                        </h3>
                        <Badge
                          className={`flex items-center gap-1 ${getStatusColor(
                            application.status
                          )}`}
                        >
                          {getStatusIcon(application.status)}
                          {application.status.charAt(0).toUpperCase() +
                            application.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Applied: {application.appliedDate}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Event: {application.eventDate}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
