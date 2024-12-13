import React, {useEffect, useState} from 'react';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../../Lib/utils.js";
import { Button } from "../../ui/button";   
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import {getAllProfesoresActivos} from "../../../provider/adm/profesores/getProfesoresActivos";
const ScrollListProfesores = ({ profesorSelectedToFilter, setprofesorSelectedToFilter, setLoading, setTeacherID }) => {
    const [open, setOpen] = React.useState(false);
    const [listaProfesores, setlistaProfesores] = useState([]);
    useEffect(() => {
    setLoading(true);
      const fetchFrameworks = async () => {
        try {
          setlistaProfesores(await getAllProfesoresActivos(false));
        } catch (error) {
          console.error("Error fetching frameworks:", error);
        }
      };
      
      fetchFrameworks();
    setLoading(false);
    }, [setLoading]);
  
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
            <Button
                variant="outline"
                role="combobox"
                type="button" 
                className="w-[200px] justify-between"
                onClick={ (event) => {   
                  event.preventDefault();
                  event.stopPropagation();
                  setOpen(true);
                }}
              >
                {profesorSelectedToFilter
                  ? listaProfesores.find((framework) => framework.fullName === profesorSelectedToFilter)
                      ?.fullName
                  : "Selecciona profeosor..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {listaProfesores.map((framework) => (
                      <CommandItem
                      key={framework.id}
                      value={framework.fullName}
                      onSelect={(currentValue) => {
                        setprofesorSelectedToFilter(currentValue === profesorSelectedToFilter ? "" : currentValue);
                        if (setTeacherID){
                          setTeacherID(framework.id);
                        }
                        setOpen(false);
                      }}
                    >
                        {framework.fullName}
                        <Check
                          className={cn(
                            "ml-auto",
                            profesorSelectedToFilter === framework.fullName
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
    );
};

export default ScrollListProfesores;