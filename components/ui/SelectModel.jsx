import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectModel() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="لۆجیستیک ڕیگرێشن" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="text-right">
          <SelectLabel>جۆری مۆدێل </SelectLabel>
          <SelectItem value="logistic" className="text-right">
            لۆجیستیک ڕیگرێشن
          </SelectItem>
          <SelectItem value="svm">سەپۆڕت ڤێکتەر ماشین</SelectItem>
          <SelectItem value="rf">ڕاندەم فۆڕێست</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
