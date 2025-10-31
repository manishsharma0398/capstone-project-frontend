"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, XCircle } from "lucide-react"

interface ApplicationCardProps {
  id: number
  name: string
  opportunity: string
  status: "pending" | "approved" | "rejected" | "accepted"
  appliedDate: string
  email?: string
  hoursCommitted?: number
  onApprove?: () => void
  onReject?: () => void
  onWithdraw?: () => void
  userType?: "volunteer" | "organization"
}

export function ApplicationCard({
  id,
  name,
  opportunity,
  status,
  appliedDate,
  email,
  hoursCommitted,
  onApprove,
  onReject,
  onWithdraw,
  userType = "volunteer",
}: ApplicationCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
      case "approved":
        return <CheckCircle size={16} />
      case "pending":
        return <Clock size={16} />
      case "rejected":
        return <XCircle size={16} />
      default:
        return null
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              <Badge className={`flex items-center gap-1 ${getStatusColor(status)}`}>
                {getStatusIcon(status)}
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
            {email && <p className="text-sm text-muted-foreground mb-3">{email}</p>}
            <div className="grid gap-2 text-sm text-muted-foreground mb-4">
              <div>Opportunity: {opportunity}</div>
              <div>Applied: {appliedDate}</div>
              {hoursCommitted && <div>Committed Hours: {hoursCommitted}</div>}
            </div>
          </div>
          <div className="flex gap-2">
            {status === "pending" && userType === "organization" && (
              <>
                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={onApprove}>
                  Approve
                </Button>
                <Button size="sm" variant="outline" onClick={onReject} className="bg-transparent">
                  Reject
                </Button>
              </>
            )}
            {status === "pending" && userType === "volunteer" && (
              <Button size="sm" variant="outline" onClick={onWithdraw} className="bg-transparent">
                Withdraw
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
