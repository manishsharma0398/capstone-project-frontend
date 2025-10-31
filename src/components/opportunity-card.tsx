"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users } from "lucide-react"

interface OpportunityCardProps {
  id: number
  title: string
  organization: string
  location: string
  date: string
  category: string
  volunteersNeeded: number
  volunteersApplied?: number
  description: string
  showApplyButton?: boolean
  showStats?: boolean
}

export function OpportunityCard({
  id,
  title,
  organization,
  location,
  date,
  category,
  volunteersNeeded,
  volunteersApplied,
  description,
  showApplyButton = true,
  showStats = false,
}: OpportunityCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <Badge variant="secondary">{category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{organization}</p>
            <p className="text-sm text-foreground mb-4 line-clamp-2">{description}</p>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} />
                {location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={16} />
                {date}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users size={16} />
                {volunteersNeeded} needed
              </div>
            </div>

            {showStats && volunteersApplied !== undefined && (
              <div className="p-3 bg-muted rounded-lg mb-4">
                <p className="text-sm text-muted-foreground">
                  {volunteersApplied} / {volunteersNeeded} volunteers applied
                </p>
              </div>
            )}
          </div>

          {showApplyButton && (
            <Link href={`/listings/${id}`}>
              <Button>View</Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
