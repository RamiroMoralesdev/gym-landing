'use client';

import { Exercises } from "@/components/exercises";

export default function Portal() {
  return (
    <div className="min-h-screen p-8 bg-gray-950">
      <h1>Portal Alumno - Acceso a Rutinas y Planes de Nutricion</h1>
      <span>Solo podra acceder si su cuota se encuentra activa </span>
      <div>
        <form action="" className="flex flex-col gap-4 max-w-48">
          <input type="text" placeholder="Ingrese su DNI" minLength={8} maxLength={9  } className="px-4 py-2 border border-gray-300 rounded" />
          <button type="submit" className="px-4 py-2 bg-green-700 text-white rounded hover:bg-blue-800 transition-colors">Acceder</button>
        </form>
      </div>
      <Exercises />
    </div>
  );
}