"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { applicationsFetcher } from "@/services";

interface ApplyModalProps {
  listingId: number;
  open: boolean;
  onClose: () => void;
}

export function ApplyModal({ listingId, open, onClose }: ApplyModalProps) {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      await applicationsFetcher.post("/apply", {
        listingId,
        volunteerMessage: message.trim() || null,
      });

      alert("Application submitted successfully!");
      onClose(); // close modal
    } catch (error) {
      console.error("Application failed:", error);
      alert("Failed to apply. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Apply for this Opportunity</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            You can optionally include a short message to the organization.
          </p>
          <Textarea
            placeholder="Write a short message (optional)..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Application"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
