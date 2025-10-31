"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, MapPin, Phone, Globe, Users } from "lucide-react";
import { Navbar } from "@/components/navbar";

const focusAreasData = [
  "Education",
  "Environment",
  "Health & Wellness",
  "Senior Care",
  "Community Development",
];
const certificationsData = [
  "501(c)(3) Nonprofit",
  "Verified Partner",
  "Impact Champion",
];

export default function OrgProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Green Earth Initiative",
    email: "contact@greenearthinitiative.org",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    website: "www.greenearthinitiative.org",
    bio: "We are a nonprofit organization dedicated to environmental conservation and community engagement. Our mission is to create sustainable solutions for a healthier planet.",
    focusAreas: focusAreasData,
    certifications: certificationsData,
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save profile logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/org-dashboard"
          className="flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">
                      {profileData.name}
                    </h1>
                    <p className="text-muted-foreground">
                      Partner since September 2024
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "default"}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              {!isEditing && (
                <CardDescription>Organization details</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Organization Name
                    </label>
                    <Input type="text" defaultValue={profileData.name} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" defaultValue={profileData.email} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input type="tel" defaultValue={profileData.phone} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input type="text" defaultValue={profileData.location} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Website</label>
                    <Input type="url" defaultValue={profileData.website} />
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-foreground">
                    <Mail size={18} className="text-muted-foreground" />
                    {profileData.email}
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Phone size={18} className="text-muted-foreground" />
                    {profileData.phone}
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <MapPin size={18} className="text-muted-foreground" />
                    {profileData.location}
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Globe size={18} className="text-muted-foreground" />
                    <a
                      href={`https://${profileData.website}`}
                      className="text-primary hover:underline"
                    >
                      {profileData.website}
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bio */}
          <Card>
            <CardHeader>
              <CardTitle>About Organization</CardTitle>
              {!isEditing && (
                <CardDescription>
                  Tell volunteers about your mission
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  defaultValue={profileData.bio}
                  className="min-h-[120px]"
                />
              ) : (
                <p className="text-foreground leading-relaxed">
                  {profileData.bio}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Focus Areas */}
          <Card>
            <CardHeader>
              <CardTitle>Focus Areas</CardTitle>
              {!isEditing && (
                <CardDescription>
                  Areas your organization focuses on
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.focusAreas.map((area) => (
                  <Badge key={area} variant="secondary">
                    {area}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Certifications & Badges</CardTitle>
              {!isEditing && (
                <CardDescription>Credentials and recognition</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.certifications.map((cert) => (
                  <Badge key={cert} className="bg-primary text-white">
                    ✓ {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Organization Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Organization Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users size={20} className="text-primary" />
                    <span className="text-sm font-medium">
                      Active Volunteers
                    </span>
                  </div>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe size={20} className="text-accent" />
                    <span className="text-sm font-medium">
                      Opportunities Posted
                    </span>
                  </div>
                  <p className="text-2xl font-bold">28</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">★ Rating</span>
                  </div>
                  <p className="text-2xl font-bold">4.9/5.0</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {isEditing && (
            <div className="flex gap-4">
              <Button onClick={handleSave} className="flex-1">
                Save Changes
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
