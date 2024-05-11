"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "next.js",
    label: "لۆجیستیک",
  },
  {
    value: "sveltekit",
    label: "سەپۆڕت ڤێکتەر ماشین",
  },
  {
    value: "nuxt.js",
    label: "ڕاندۆم فۆڕێست",
  },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-right"
        >
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "لۆجیستیک مۆدێل"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div>
          <span className="border-none ">
            {frameworks.map((framework) => (
              <p
                className="text-white bg-black/90"
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </p>
            ))}
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
