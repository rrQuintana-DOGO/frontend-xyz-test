import * as React from "react";
import { SearchBarProps } from "./Types";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const getNow = () => {
  const now = new Date();
  const year = now.getFullYear().toString().padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const SearchBar: React.FC<SearchBarProps> = () => {
  return (
    <div className="flex w-full">
        <div className="relative flex-grow w-2/5">
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
            >
                <path d="M11.271 11.978L15.1427 15.8507C15.2407 15.9478 15.3687 15.9967 15.4967 15.9967C15.6248 15.9967 15.7527 15.9478 15.8507 15.8507C16.0457 15.6547 16.0457 15.3387 15.8507 15.1427L12.2861 11.5791C14.6669 8.8324 14.5527 4.65637 11.9438 2.04675C9.21444 -0.68225 4.77356 -0.68225 2.04624 2.04675C-0.682079 4.77575 -0.682079 9.21775 2.04624 11.9467C3.36891 13.2687 5.12647 13.9967 6.995 13.9967C7.27093 13.9967 7.49487 13.7727 7.49487 13.4967C7.49487 13.2207 7.27093 12.9967 6.995 12.9967C5.3924 12.9967 3.88678 12.3728 2.75306 11.2397C0.414647 8.89975 0.414647 5.09375 2.75306 2.75375C5.09048 0.41375 8.89552 0.41475 11.2369 2.75375C13.5754 5.09375 13.5754 8.89975 11.2369 11.2397C11.042 11.4347 11.042 11.7517 11.2369 11.9467C11.2479 11.9578 11.2593 11.9682 11.271 11.978Z" fill="#343741" />
            </svg>
            <input
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Nombre, id, lugar..."
            />
        </div>
        <div className="relative flex-grow w-3/5 ml-12">
            <Button
                className="!text-slate-700 text-sm !border-slate-200 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                variant="outlined"
                startIcon={
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.38195 0.666993H6.61773C5.4021 0.666975 4.42225 0.66696 3.65162 0.77057C2.85152 0.87814 2.17785 1.10827 1.64282 1.6433C1.10778 2.17834 0.877651 2.85201 0.770081 3.6521C0.666472 4.42274 0.666487 5.40257 0.666504 6.6182V9.38244C0.666487 10.5981 0.666472 11.5779 0.770081 12.3486C0.877651 13.1486 1.10778 13.8223 1.64282 14.3573C2.17785 14.8924 2.85152 15.1225 3.65162 15.2301C4.42226 15.3337 5.4021 15.3337 6.61775 15.3337H9.38193C10.5976 15.3337 11.5774 15.3337 12.3481 15.2301C13.1482 15.1225 13.8218 14.8924 14.3569 14.3573C14.8919 13.8223 15.122 13.1486 15.2296 12.3486C15.3332 11.5779 15.3332 10.5981 15.3332 9.38242V6.61824C15.3332 5.40259 15.3332 4.42275 15.2296 3.6521C15.122 2.85201 14.8919 2.17834 14.3569 1.6433C13.8218 1.10827 13.1482 0.87814 12.3481 0.77057C11.5774 0.66696 10.5976 0.666975 9.38195 0.666993ZM2.58563 2.58611C2.83164 2.3401 3.17703 2.17971 3.82928 2.09201C4.07607 2.05883 4.35237 2.03766 4.6665 2.02414V5.33366H2.00577C2.01462 4.72659 2.03666 4.23783 2.09152 3.82977C2.17922 3.17752 2.33961 2.83213 2.58563 2.58611ZM1.99984 6.66699V9.33366L4.6665 9.33366V6.66699L1.99984 6.66699ZM5.99984 6.66699V9.33366L13.9998 9.33366V6.66699L5.99984 6.66699ZM13.9939 5.33366C13.9851 4.72659 13.963 4.23783 13.9082 3.82977C13.8205 3.17752 13.6601 2.83213 13.4141 2.58611C13.168 2.3401 12.8226 2.17971 12.1704 2.09201C11.499 2.00174 10.6091 2.00033 9.33317 2.00033H6.66651C6.43154 2.00033 6.20967 2.00037 5.99984 2.00102V5.33366H13.9939ZM2.00577 10.667H4.6665V13.9765C4.35237 13.963 4.07607 13.9418 3.82928 13.9086C3.17703 13.8209 2.83164 13.6606 2.58563 13.4145C2.33961 13.1685 2.17922 12.8231 2.09152 12.1709C2.03666 11.7628 2.01462 11.2741 2.00577 10.667ZM13.9939 10.667H5.99984V13.9996C6.20967 14.0003 6.43154 14.0003 6.66651 14.0003H9.33317C10.6091 14.0003 11.499 13.9989 12.1704 13.9086C12.8226 13.8209 13.168 13.6606 13.4141 13.4145C13.6601 13.1685 13.8205 12.8231 13.9082 12.1709C13.963 11.7628 13.9851 11.2741 13.9939 10.667Z"
                            fill="#1A1C21"
                        />
                    </svg>
                }
            >
            Clientes
            </Button>
            <FormControl size="small">
                <InputLabel id="select-label">Fecha</InputLabel>
                <Select labelId="select-label" label="Fecha" defaultValue={getNow()}>
                    <MenuItem value={getNow()}>
                        <em>{getNow()}</em>
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    </div>
  );
};