"use client";

import * as React from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Search } from "lucide-react";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils";
import { skillsFetcher } from "@/services";

interface Skill {
  id: number;
  title: string;
  description?: string;
}

interface SkillsSelectorProps {
  selectedSkills: Skill[];
  setSelectedSkills: (skills: Skill[]) => void;
}

export function SkillsSelector({
  selectedSkills,
  setSelectedSkills,
}: SkillsSelectorProps) {
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState<Skill[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const fetchSkills = React.useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false); // ✅ close only when input is cleared
      return;
    }

    setLoading(true);
    try {
      const res = await skillsFetcher.get(`/search?query=${query}`);
      const items = res.data?.data?.items ?? [];
      setResults(items);
      setOpen(true); // ✅ always open when searching
    } catch (err) {
      console.error("Skill search failed:", err);
      setResults([]);
      setOpen(true); // ✅ keep it open to show "No skills found"
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const delay = setTimeout(() => fetchSkills(search), 300);
    return () => clearTimeout(delay);
  }, [search, fetchSkills]);

  const handleSelect = (skill: Skill) => {
    if (!selectedSkills.some((s) => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setSearch("");
    setOpen(false);
  };

  const handleRemove = (id: number) => {
    setSelectedSkills(selectedSkills.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search skills..."
          className="pl-8"
        />
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>

      <Popover
        open={open}
        onOpenChange={(state) => {
          // allow manual close (e.g., clicking outside)
          if (!state) setOpen(false);
        }}
      >
        <PopoverTrigger asChild>
          <span tabIndex={-1} />
        </PopoverTrigger>

        <PopoverContent
          align="start"
          side="bottom"
          sideOffset={4}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="w-[320px] p-0 shadow-md border border-border bg-background"
        >
          <Command>
            <CommandGroup>
              {loading ? (
                <div className="py-3 text-center text-sm text-muted-foreground">
                  Searching...
                </div>
              ) : results.length === 0 ? (
                <div className="py-3 text-center text-sm text-muted-foreground">
                  No skills found
                </div>
              ) : (
                results.map((skill) => (
                  <CommandItem
                    key={skill.id}
                    onSelect={() => handleSelect(skill)}
                    className={cn(
                      "cursor-pointer text-sm hover:bg-muted px-3 py-2",
                      selectedSkills.some((s) => s.id === skill.id) &&
                        "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {skill.title}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {selectedSkills.map((skill) => (
            <Badge
              key={skill.id}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {skill.title}
              <X
                onClick={() => handleRemove(skill.id)}
                className="h-3.5 w-3.5 cursor-pointer text-muted-foreground hover:text-destructive"
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
