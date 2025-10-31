"use client"

import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

interface ProfileHeaderProps {
  name: string
  subtitle: string
  icon: ReactNode
  onEditClick: () => void
  isEditing: boolean
}

export function ProfileHeader({ name, subtitle, icon, onEditClick, isEditing }: ProfileHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              {icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{name}</h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <Button onClick={onEditClick} variant={isEditing ? "outline" : "default"}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}
