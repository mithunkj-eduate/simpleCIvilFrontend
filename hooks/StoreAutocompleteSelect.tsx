// src/components/AutocompleteSelect.tsx
import React from "react";
import { TextField, Autocomplete } from "@mui/material";
import { AutoCompleteOption } from "@/utils/commenTypes";

interface Props {
  label?: string;
  options: AutoCompleteOption[];
  value: AutoCompleteOption | null;
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    newValue: AutoCompleteOption | null
  ) => void;
  className?: string;
}

export default function AutocompleteSelect({
  label,
  options,
  value,
  onChange,
  className,
}: Props) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      getOptionLabel={(option) => option.label}
      value={value}
      onChange={onChange}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
      isOptionEqualToValue={(option, val) => option.value === val.value}
      className= {className}
    />
  );
}
