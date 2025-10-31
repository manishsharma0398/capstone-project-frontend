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
import {
  Users,
  CheckCircle,
  AlertCircle,
  Plus,
  MessageSquare,
} from "lucide-react";
import { Navbar } from "@/components/navbar";

const postedOpportunitiesData = [
  {
    id: 1,
    title: "Community Garden Cleanup",
    date: "Nov 15, 2024",
    volunteersNeeded: 15,
    volunteersApplied: 8,
    status: "active",
  },
  {
    id: 2,
    title: "Senior Fitness Classes",
    date: "Nov 10, 2024",
    volunteersNeeded: 5,
    volunteersApplied: 3,
    status: "active",
  },
  {
    id: 3,
    title: "Youth Mentoring Program",
    date: "Nov 12, 2024",
    volunteersNeeded: 20,
    volunteersApplied: 12,
    status: "active",
  },
];

const applicationsData = [
  {
    id: 1,
    volunteerName: "Sarah Johnson",
    opportunity: "Community Garden Cleanup",
    status: "pending",
    appliedDate: "Nov 3, 2024",
  },
  {
    id: 2,
    volunteerName: "Michael Chen",
    opportunity: "Senior Fitness Classes",
    status: "approved",
    appliedDate: "Nov 1, 2024",
  },
  {
    id: 3,
    volunteerName: "Emma Davis",
    opportunity: "Youth Mentoring Program",
    status: "pending",
    appliedDate: "Nov 5, 2024",
  },
];

export default function OrgDashboardPage() {
  const [activeTab, setActiveTab] = useState("opportunities");
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "approved":
        return <CheckCircle size={16} />;
      case "pending":
        return <AlertCircle size={16} />;
      case "closed":
        return null;
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
              Welcome back, Organization!
            </h1>
            <p className="text-muted-foreground">
              Manage your opportunities and volunteer applications
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Post Opportunity</Button>
            <Link href="/org-dashboard/profile">
              <Button>Edit Profile</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Active Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                23 volunteers needed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">8 to be reviewed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Approved Volunteers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                Active commitments
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
              Posted Opportunities
            </TabsTrigger>
            <TabsTrigger value="applications">
              Volunteer Applications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Your Opportunities</CardTitle>
                    <CardDescription>
                      Manage volunteer opportunities posted by your organization
                    </CardDescription>
                  </div>
                  <Button size="sm" className="flex items-center gap-2">
                    <Plus size={16} />
                    Post New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {postedOpportunitiesData.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">
                          {opportunity.title}
                        </h3>
                        <Badge
                          className={`flex items-center gap-1 ${getStatusColor(
                            opportunity.status
                          )}`}
                        >
                          {getStatusIcon(opportunity.status)}
                          {opportunity.status.charAt(0).toUpperCase() +
                            opportunity.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Date: {opportunity.date}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Users size={16} className="text-muted-foreground" />
                          <span>Needed: {opportunity.volunteersNeeded}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle
                            size={16}
                            className="text-muted-foreground"
                          />
                          <span>Applied: {opportunity.volunteersApplied}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-4 bg-transparent"
                    >
                      Edit
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Applications</CardTitle>
                <CardDescription>
                  Review and manage applications from volunteers
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
                          {application.volunteerName}
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
                        Opportunity: {application.opportunity}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Applied: {application.appliedDate}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 bg-transparent"
                      >
                        <MessageSquare size={16} />
                        Message
                      </Button>
                      {application.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            Decline
                          </Button>
                        </>
                      )}
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
