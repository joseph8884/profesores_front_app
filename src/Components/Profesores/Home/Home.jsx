import React from 'react';
import { Button } from "../../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet";
import NavMobile from '../Nav/NavMobile';
import NavDesktop from '../Nav/NavWeb';
const Home = () => {
  return (
    <div className="min-h-screen flex">
      <NavMobile />
      <NavDesktop />

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
