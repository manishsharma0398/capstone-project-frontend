"use client"

import { Button } from "@/components/ui/button"

interface FilterTabsProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
  size?: "sm" | "default" | "lg"
}

export function FilterTabs({ tabs, activeTab, onTabChange, size = "sm" }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant={activeTab === tab ? "default" : "outline"}
          onClick={() => onTabChange(tab)}
          size={size}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </Button>
      ))}
    </div>
  )
}
