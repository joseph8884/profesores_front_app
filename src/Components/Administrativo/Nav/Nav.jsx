import React from "react";
import { Button } from "../../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
const Nav = () => {
  return (
    <nav className="flex flex-col">
      <a href="/admin/home">
        <Button variant="ghost" className="justify-start text-left">
          Inicio
        </Button>
      </a>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="inline-flex h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
            Estudiantes privados
          </AccordionTrigger>
          <AccordionContent>
            <a href="/admin/tablaestudiantes/estudiantesprivados">
              <Button variant="ghost">
                <li>Est. Activos</li>
              </Button>
            </a>
            <a href="/admin/tablaestudiantes/estudiantesprivadosinactivos">
              <Button variant="ghost">
                <li>Est. Inactivos</li>
              </Button>
            </a>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="inline-flex h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
            Grupales
          </AccordionTrigger>
          <AccordionContent>
            <a href="/admin/gruposvista/grupos">
              <Button variant="ghost">
                <li>Activos</li>
              </Button>
              <a href="#">
                <Button variant="ghost">
                  <li>Inactivos</li>
                </Button>
              </a>
            </a>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="inline-flex h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
            Profesores
          </AccordionTrigger>
          <AccordionContent>
            <a href="/admin/profesores/activos">
              <Button variant="ghost">
                <li>Profesores Activos</li>
              </Button>
            </a>
            <a href="/admin/profesores/inactivos">
              <Button variant="ghost">
                <li>Profesores Inactivos</li>
              </Button>
            </a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  );
};
export default Nav;
