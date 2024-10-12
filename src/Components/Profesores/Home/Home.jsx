import React from 'react';
import { Button } from "../../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

const Home = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar Hamburguesa para pantallas pequeñas */}
      <Sheet>
        <SheetTrigger asChild>
          {/* Este botón será visible solo en pantallas pequeñas */}
          <Button variant="outline" className="md:hidden">☰</Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>Menú</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 mt-4">
            <Button variant="ghost">Inicio</Button>
            <a href="/estudiantes_privados_ver"><Button variant="ghost">Estudiantes</Button></a>
            <Button variant="ghost">Profesores</Button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Sidebar para pantallas grandes */}
      <div className="hidden md:flex flex-col w-64 bg-blue-900 text-white min-h-screen">
        <div className="p-4">
          <img src="logo.png" alt="Logo" className="h-12 mb-6"/>
          <nav className="flex flex-col gap-4">
            <Button variant="ghost" className="justify-start text-left text-white">Inicio</Button>
            <Button variant="ghost" className="justify-start text-left text-white">Estudiantes</Button>
            <Button variant="ghost" className="justify-start text-left text-white">Profesores</Button>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="flex items-center gap-2">
            <img src="user-profile.jpg" alt="User" className="h-10 w-10 rounded-full"/>
            <div>
              <p className="font-semibold">Gustavo Xavier</p>
              <Button variant="ghost" className="text-red-500">Log out</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 p-6 bg-gray-100">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Welcome Back, Gustavo</h1>
          <p className="text-sm text-gray-600">Here is the information</p>
        </header>

        <section>
          <h2 className="text-xl font-bold mb-4">Comienza la configuración de tu plataforma</h2>
          <div className="flex gap-4 mb-6">
            <Button className="bg-black text-white">Lets Go →</Button>
            <Button className="bg-black text-white">Lets Go →</Button>
            <Button className="bg-black text-white">Lets Go →</Button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-4">Administración de TI</h3>
          <p className="mb-6">Establece administradores, cuentas de facturación y otras opciones de configuración en tu entorno de Google Cloud</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-green-500 text-white flex items-center justify-center mb-2">1</div>
              <p className="text-center">Establece tu organización, tus administradores y tu facturación</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-green-500 text-white flex items-center justify-center mb-2">2</div>
              <p className="text-center">Crea una arquitectura inicial</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-green-500 text-white flex items-center justify-center mb-2">3</div>
              <p className="text-center">Implementa y descarga la configuración</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
