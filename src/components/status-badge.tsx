"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react"

interface StatusBadgeProps {
  status: "pending" | "approved" | "rejected" | "accepted" | "active" | "closed"
  showIcon?: boolean
}

export function StatusBadge({ status, showIcon = true }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
      case "approved":
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
      case "closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
      case "approved":
      case "active":
        return <CheckCircle size={16} />
      case "pending":
        return <Clock size={16} />
      case "rejected":
      case "closed":
        return <XCircle size={16} />
      default:
        return <AlertCircle size={16} />
    }
  }

  return (
    <Badge className={`flex items-center gap-1 ${getStatusColor(status)}`}>
      {showIcon && getStatusIcon(status)}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
