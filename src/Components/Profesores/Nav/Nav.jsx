import React from "react";
import { Button } from "../../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

const Nav = ({profesorId, nombre}) => {


  return (
    <nav className="flex flex-col">
      <a href="/profesor/home">
        <Button variant="ghost" className="justify-start text-left">
          Inicio
        </Button>
      </a>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="inline-flex h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
            Registrar Horas
          </AccordionTrigger>
          <AccordionContent>
            <a href={`/profesor/registrarhoras/estudianteindividual?&profesorId=${profesorId}`}>
              <Button variant="ghost">
                <li>Estudiantes individuales</li>
              </Button>
            </a>
            <a href={`/profesor/registrarhoras/grupos?&profesorId=${profesorId}`}>
            <Button variant="ghost">
              <li>Grupos empresas</li>
            </Button>
            </a>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="inline-flex h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
            Dashboard
          </AccordionTrigger>
          <AccordionContent>
            <a href={`/profesor/dashboard?&profesorId=${profesorId}&nombre=${nombre}`}>
            <Button variant="ghost">
              <li>Ver Dashboard</li>
            </Button>
            </a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  );
};
export default Nav;
