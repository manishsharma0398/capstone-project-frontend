"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, Archive, Eye } from "lucide-react";
import { Navbar } from "@/components/navbar";

const volunteersApplicationsData = [
  {
    id: 1,
    opportunity: "Community Garden Cleanup",
    organization: "Green Earth Initiative",
    status: "accepted",
    appliedDate: "Nov 1, 2024",
    eventDate: "Nov 15, 2024",
    eventTime: "9:00 AM - 12:00 PM",
    location: "Downtown Park",
  },
  {
    id: 2,
    opportunity: "Senior Fitness Classes",
    organization: "Active Living Foundation",
    status: "pending",
    appliedDate: "Nov 3, 2024",
    eventDate: "Nov 10, 2024",
    eventTime: "2:00 PM - 3:30 PM",
    location: "Community Center",
  },
  {
    id: 3,
    opportunity: "Youth Mentoring Program",
    organization: "Future Leaders Academy",
    status: "accepted",
    appliedDate: "Oct 28, 2024",
    eventDate: "Nov 12, 2024",
    eventTime: "4:00 PM - 5:30 PM",
    location: "Various Locations",
  },
  {
    id: 4,
    opportunity: "Food Bank Assistance",
    organization: "Community Food Bank",
    status: "rejected",
    appliedDate: "Oct 25, 2024",
    eventDate: "Nov 18, 2024",
    eventTime: "10:00 AM - 1:00 PM",
    location: "Main Street Warehouse",
  },
];

const organizationApplicationsData = [
  {
    id: 1,
    volunteerName: "Sarah Johnson",
    email: "sarah.j@email.com",
    opportunity: "Community Garden Cleanup",
    status: "approved",
    appliedDate: "Nov 3, 2024",
    hoursCommitted: 3,
  },
  {
    id: 2,
    volunteerName: "Michael Chen",
    email: "michael.chen@email.com",
    opportunity: "Community Garden Cleanup",
    status: "pending",
    appliedDate: "Nov 4, 2024",
    hoursCommitted: 3,
  },
  {
    id: 3,
    volunteerName: "Emma Davis",
    email: "emma.d@email.com",
    opportunity: "Senior Fitness Classes",
    status: "approved",
    appliedDate: "Nov 2, 2024",
    hoursCommitted: 6,
  },
  {
    id: 4,
    volunteerName: "James Wilson",
    email: "james.w@email.com",
    opportunity: "Community Garden Cleanup",
    status: "rejected",
    appliedDate: "Oct 30, 2024",
    hoursCommitted: 3,
  },
];

export default function ApplicationsPage() {
  const [volunteersApps, setVolunteersApps] = useState(
    volunteersApplicationsData
  );
  const [orgApps, setOrgApps] = useState(organizationApplicationsData);
  const [userType, setUserType] = useState<"volunteer" | "organization">(
    "volunteer"
  );
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
      case "approved":
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
      case "approved":
        return <CheckCircle size={16} />;
      case "pending":
        return <Clock size={16} />;
      case "rejected":
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  const filterApplications = (apps: any[]) => {
    if (filterStatus === "all") return apps;
    return apps.filter((app) => app.status === filterStatus);
  };

  const handleApproveApplication = (id: number) => {
    setOrgApps(
      orgApps.map((app) =>
        app.id === id ? { ...app, status: "approved" } : app
      )
    );
  };

  const handleRejectApplication = (id: number) => {
    setOrgApps(
      orgApps.map((app) =>
        app.id === id ? { ...app, status: "rejected" } : app
      )
    );
  };

  const handleWithdrawApplication = (id: number) => {
    setVolunteersApps(volunteersApps.filter((app) => app.id !== id));
  };

  if (userType === "volunteer") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                My Applications
              </h1>
              <p className="text-muted-foreground">
                Track your volunteer opportunity applications
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setUserType("organization")}
              className="bg-transparent"
            >
              View as Organization
            </Button>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {volunteersApps.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Accepted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {volunteersApps.filter((a) => a.status === "accepted").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {volunteersApps.filter((a) => a.status === "pending").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {volunteersApps.filter((a) => a.status === "rejected").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="mb-6 flex gap-2">
            {["all", "accepted", "pending", "rejected"].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                onClick={() => setFilterStatus(status)}
                size="sm"
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {filterApplications(volunteersApps).length > 0 ? (
              filterApplications(volunteersApps).map((app) => (
                <Card
                  key={app.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {app.opportunity}
                          </h3>
                          <Badge
                            className={`flex items-center gap-1 ${getStatusColor(
                              app.status
                            )}`}
                          >
                            {getStatusIcon(app.status)}
                            {app.status.charAt(0).toUpperCase() +
                              app.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {app.organization}
                        </p>
                        <div className="grid gap-2 md:grid-cols-3 text-sm text-muted-foreground mb-4">
                          <div>Applied: {app.appliedDate}</div>
                          <div>
                            Event: {app.eventDate} at {app.eventTime}
                          </div>
                          <div>Location: {app.location}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/listings/${app.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 bg-transparent"
                          >
                            <Eye size={16} />
                            View
                          </Button>
                        </Link>
                        {app.status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleWithdrawApplication(app.id)}
                            className="bg-transparent"
                          >
                            Withdraw
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    No applications found.
                  </p>
                  <Link href="/listings">
                    <Button>Browse Opportunities</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Organization View
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Volunteer Applications
            </h1>
            <p className="text-muted-foreground">
              Manage and review volunteer applications
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setUserType("volunteer")}
            className="bg-transparent"
          >
            View as Volunteer
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orgApps.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {orgApps.filter((a) => a.status === "approved").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {orgApps.filter((a) => a.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {orgApps.filter((a) => a.status === "rejected").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-2">
          {["all", "approved", "pending", "rejected"].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              onClick={() => setFilterStatus(status)}
              size="sm"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filterApplications(orgApps).length > 0 ? (
            filterApplications(orgApps).map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {app.volunteerName}
                        </h3>
                        <Badge
                          className={`flex items-center gap-1 ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {getStatusIcon(app.status)}
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {app.email}
                      </p>
                      <div className="grid gap-2 md:grid-cols-3 text-sm text-muted-foreground mb-4">
                        <div>Opportunity: {app.opportunity}</div>
                        <div>Applied: {app.appliedDate}</div>
                        <div>Committed Hours: {app.hoursCommitted}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {app.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveApplication(app.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectApplication(app.id)}
                            className="bg-transparent"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {app.status !== "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent"
                        >
                          <Archive size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No applications found.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
