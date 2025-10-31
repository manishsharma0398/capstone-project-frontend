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
import {
  Heart,
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  CheckCircle,
} from "lucide-react";
import { Navbar } from "@/components/navbar";

const skillsData = [
  "Community Outreach",
  "Teaching",
  "Event Planning",
  "Fundraising",
  "Marketing",
];
const interestsData = [
  "Education",
  "Environment",
  "Health & Wellness",
  "Senior Care",
  "Youth Development",
];

export default function VolunteerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate about making a difference in my community. I enjoy working with people and love outdoor activities.",
    skills: skillsData,
    interests: interestsData,
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
          href="/dashboard"
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
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">
                      {profileData.name}
                    </h1>
                    <p className="text-muted-foreground">
                      Member since October 2024
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
                <CardDescription>Your personal details</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
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
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bio */}
          <Card>
            <CardHeader>
              <CardTitle>Bio</CardTitle>
              {!isEditing && (
                <CardDescription>
                  Tell organizations about yourself
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  defaultValue={profileData.bio}
                  className="min-h-[100px]"
                />
              ) : (
                <p className="text-foreground leading-relaxed">
                  {profileData.bio}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              {!isEditing && (
                <CardDescription>Highlight your abilities</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Interests</CardTitle>
              {!isEditing && (
                <CardDescription>
                  Areas you want to contribute to
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest) => (
                  <Badge key={interest} className="bg-primary text-white">
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Volunteer Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                  <p className="text-2xl font-bold">8 events</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Heart size={20} className="text-accent" />
                    <span className="text-sm font-medium">Total Impact</span>
                  </div>
                  <p className="text-2xl font-bold">24 hours</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">★ Rating</span>
                  </div>
                  <p className="text-2xl font-bold">4.8/5.0</p>
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
