"use client";

import type React from "react";

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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronLeft,
  Plus,
  X,
  Clock,
  MapPin,
  Briefcase,
  Edit,
  Eye,
} from "lucide-react";
import { SkillsSelector } from "@/components/SkillsSelector";
import { MediaUploader } from "@/components/MediaUploader";
import { mediaFetcher } from "@/services";
import axios from "axios";

const LISTING_TYPES = [
  { value: "volunteer_opportunity", label: "Volunteer Opportunity" },
  { value: "donation_request", label: "Donation Request" },
  { value: "event", label: "Event" },
  { value: "job", label: "Job Listing" },
];

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

const STEPS = ["details", "location", "skills", "schedule", "media", "preview"];

export default function CreateListingPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    listingType: "volunteer_opportunity",
    status: "draft",
    city: "",
    state: "",
    country: "India",
  });

  const [selectedSkills, setSelectedSkills] = useState<
    { id: number; title: string }[]
  >([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: "1", day: "Saturday", startTime: "10:00", endTime: "14:00" },
  ]);
  const [media, setMedia] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("details");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { toastHelpers } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTimeSlot = () => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      day: "Monday",
      startTime: "09:00",
      endTime: "17:00",
    };
    setTimeSlots((prev) => [...prev, newSlot]);
  };

  const updateTimeSlot = (id: string, field: string, value: string) => {
    setTimeSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot))
    );
  };

  const removeTimeSlot = (id: string) => {
    if (timeSlots.length > 1) {
      setTimeSlots((prev) => prev.filter((slot) => slot.id !== id));
    }
  };

  const goToNextStep = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setActiveTab(STEPS[currentStepIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setActiveTab(STEPS[currentStepIndex - 1]);
    }
  };

  const editSection = (sectionIndex: number) => {
    setCurrentStepIndex(sectionIndex);
    setActiveTab(STEPS[sectionIndex]);
  };

  const handleSaveDraft = () => {
    console.log("[v0] Saving draft:", formData, selectedSkills, timeSlots);
    toastHelpers.listingCreated();
  };

  const handlePublish = async () => {
    // if (!formData.title || !formData.description) {
    //   toastHelpers.validationError("Please fill in all required fields");
    //   return;
    // }
    // const a = selectedSkills.map((s) => s.id);
    // console.log("[v0] Publishing listing:", formData, a, timeSlots);
    // toastHelpers.listingCreated();

    try {
      // 1️⃣ Step 1 — Request presigned URLs from backend
      const presignRes = await mediaFetcher.post("/presign", {
        files: media.map((file) => ({
          fileName: file.name,
          fileType: file.type,
          scope: "listing",
        })),
      });

      const presigned = presignRes.data?.data?.urls ?? [];

      // 2️⃣ Step 2 — Upload each file directly to S3 using the presigned URL
      await Promise.all(
        presigned.map((file, i) =>
          axios.put(file.uploadUrl, media[i], {
            headers: {
              "Content-Type": media[i].type,
            },
            onUploadProgress: (progressEvent) => {
              const percent = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || 1)
              );
              console.log(`Uploading ${file.fileName}: ${percent}%`);
            },
          })
        )
      );

      // 3️⃣ Step 3 — Get the final S3 URLs
      const uploadedUrls = presigned.map((f) => f.fileUrl);

      console.log("Debug uploadedUrls", uploadedUrls);
      //   const skillsIds = selectedSkills.map((s) => s.id);

      //   // 4️⃣ Step 4 — Save the listing with uploaded media
      //   await listingsFetcher.post("/", {
      //     ...formData,
      //     skills: skillsIds,
      //     media: uploadedUrls,
      //     timeSlots,
      //   });

      //   toastHelpers.listingCreated();
    } catch (error) {
      console.error("Publish failed:", error);
      //   toastHelpers.validationError("Failed to publish listing");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/org-dashboard">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
            >
              <ChevronLeft size={16} />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Create New Listing
            </h1>
            <p className="text-muted-foreground">
              Post a volunteer opportunity, event, donation request, or job
              listing
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <Card className="mb-8 border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              {[
                "Details",
                "Location",
                "Skills",
                "Schedule",
                "Media",
                "Preview",
              ].map((step, idx) => (
                <div key={idx} className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                      currentStepIndex === idx
                        ? "bg-primary text-primary-foreground"
                        : currentStepIndex > idx
                        ? "bg-primary/50 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  {idx < 5 && <div className="mx-2 h-0.5 w-12 bg-border" />}
                  <span className="text-sm font-medium text-muted-foreground">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Listing Details</CardTitle>
                <CardDescription>
                  Provide basic information about your listing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Community Garden Cleanup"
                    value={formData.title}
                    onChange={handleInputChange}
                    maxLength={256}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.title.length}/256 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your listing in detail..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Provide details about the opportunity, requirements, and
                    benefits
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="listingType">Listing Type *</Label>
                    <Select
                      value={formData.listingType}
                      onValueChange={(value) =>
                        handleSelectChange("listingType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LISTING_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        handleSelectChange("status", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Location Tab */}
          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin size={20} />
                  Location Details
                </CardTitle>
                <CardDescription>
                  Where will this opportunity take place?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City / Area Name</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="e.g., San Francisco"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="e.g., California"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    Currently set to India
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
                <CardDescription>
                  Select the skills needed for this opportunity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SkillsSelector
                  selectedSkills={selectedSkills}
                  setSelectedSkills={setSelectedSkills}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Clock size={20} />
                      Availability Schedule
                    </CardTitle>
                    <CardDescription>
                      Set availability times for this listing
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    onClick={addTimeSlot}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Slot
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {timeSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="p-4 border border-border rounded-lg space-y-4"
                  >
                    <div className="flex items-end justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <Label>Day of Week</Label>
                        <Select
                          value={slot.day}
                          onValueChange={(value) =>
                            updateTimeSlot(slot.id, "day", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {DAYS_OF_WEEK.map((day) => (
                              <SelectItem key={day} value={day}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label>Start Time</Label>
                        <Input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) =>
                            updateTimeSlot(slot.id, "startTime", e.target.value)
                          }
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label>End Time</Label>
                        <Input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) =>
                            updateTimeSlot(slot.id, "endTime", e.target.value)
                          }
                        />
                      </div>
                      {timeSlots.length > 1 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeTimeSlot(slot.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase size={20} />
                  Media Upload
                </CardTitle>
                <CardDescription>
                  Add images or videos to showcase your listing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MediaUploader media={media} setMedia={setMedia} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye size={20} />
                  Preview Your Listing
                </CardTitle>
                <CardDescription>
                  Review all information before publishing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Details Preview Section */}
                <div className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-foreground">
                      Listing Details
                    </h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => editSection(0)}
                      className="flex items-center gap-1"
                    >
                      <Edit size={14} />
                      Edit
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Title</p>
                      <p className="text-foreground font-medium">
                        {formData.title || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Description</p>
                      <p className="text-foreground">
                        {formData.description || "Not provided"}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted-foreground">Listing Type</p>
                        <p className="text-foreground font-medium">
                          {
                            LISTING_TYPES.find(
                              (t) => t.value === formData.listingType
                            )?.label
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <p className="text-foreground font-medium capitalize">
                          {formData.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Preview Section */}
                <div className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <MapPin size={16} />
                      Location
                    </h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => editSection(1)}
                      className="flex items-center gap-1"
                    >
                      <Edit size={14} />
                      Edit
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-muted-foreground">City</p>
                        <p className="text-foreground font-medium">
                          {formData.city || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">State</p>
                        <p className="text-foreground font-medium">
                          {formData.state || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Country</p>
                        <p className="text-foreground font-medium">
                          {formData.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills Preview Section */}
                <div className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-foreground">
                      Required Skills
                    </h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => editSection(2)}
                      className="flex items-center gap-1"
                    >
                      <Edit size={14} />
                      Edit
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    {selectedSkills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedSkills.map(({ id, title }) => {
                          //   const skill = SKILLS.find((s) => s.id === skillId);
                          return (
                            <Badge key={id} variant="secondary">
                              {title}
                            </Badge>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        No skills selected
                      </p>
                    )}
                  </div>
                </div>

                {/* Schedule Preview Section */}
                <div className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Clock size={16} />
                      Schedule
                    </h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => editSection(3)}
                      className="flex items-center gap-1"
                    >
                      <Edit size={14} />
                      Edit
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    {timeSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex justify-between items-center p-2 bg-muted rounded"
                      >
                        <span className="font-medium">{slot.day}</span>
                        <span className="text-muted-foreground">
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Media Preview Section */}
                <div className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Briefcase size={16} />
                      Media
                    </h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => editSection(4)}
                      className="flex items-center gap-1"
                    >
                      <Edit size={14} />
                      Edit
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {media.length > 0
                      ? `${media.length} file(s) uploaded`
                      : "No media uploaded"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex gap-4 justify-between">
          <div className="flex gap-2">
            <Link href="/org-dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
            {currentStepIndex < STEPS.length - 1 && (
              <Button variant="outline" onClick={handleSaveDraft}>
                Save as Draft
              </Button>
            )}
          </div>

          <div className="flex gap-4">
            {currentStepIndex > 0 && (
              <Button variant="outline" onClick={goToPreviousStep}>
                Previous
              </Button>
            )}
            {currentStepIndex < STEPS.length - 2 && (
              <Button onClick={goToNextStep}>Next</Button>
            )}
            {currentStepIndex === STEPS.length - 1 && (
              <>
                <Button variant="outline" onClick={goToPreviousStep}>
                  Previous
                </Button>
                <Button onClick={handlePublish}>Publish Listing</Button>
              </>
            )}
            {currentStepIndex === STEPS.length - 2 && (
              <Button onClick={goToNextStep}>Preview</Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
