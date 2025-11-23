'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

interface Exercise {
  id: string;
  name: string;
  names: {
    es: string;
    en: string;
  };
  image: string;
  equipment: Array<{
    id?: string;
    name: string;
  }>;
  comment: string;
  comments: {
    es: string;
    en: string;
  };
  tags: Array<{
    id: string;
    name: string;
  }>;
}

interface ExercisesResponse {
  data: Exercise[];
}

export const Exercises = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('/exercises.json');
        if (!response.ok) {
          throw new Error('Error al cargar los ejercicios');
        }
        const data: ExercisesResponse = await response.json();
        setExercises(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  // Filtrar ejercicios basado en el término de búsqueda
  const filteredExercises = useMemo(() => {
    if (!searchTerm.trim()) {
      return exercises;
    }

    const term = searchTerm.toLowerCase();
    
    return exercises.filter((exercise) => {
      // Buscar en nombre
      const nameMatch = exercise.names.es.toLowerCase().includes(term) || 
                       exercise.names.en.toLowerCase().includes(term);
      
      // Buscar en equipamiento
      const equipmentMatch = exercise.equipment.some(eq => 
        eq.name.toLowerCase().includes(term)
      );
      
      // Buscar en tags
      const tagsMatch = exercise.tags.some(tag => 
        tag.name.toLowerCase().includes(term)
      );
      
      // Buscar en comentarios
      const commentMatch = (exercise.comments?.es?.toLowerCase().includes(term)) ||
                          (exercise.comments?.en?.toLowerCase().includes(term)) ||
                          (exercise.comment?.toLowerCase().includes(term));
      
      return nameMatch || equipmentMatch || tagsMatch || commentMatch;
    });
  }, [exercises, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-xl">Cargando ejercicios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Catálogo de Ejercicios</h1>
      
      {/* Buscador */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar ejercicios por nombre, equipamiento, tags o instrucciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="mb-6 text-center">
        <p className="text-lg text-white">
          {searchTerm ? (
            <>
              {filteredExercises.length} ejercicio{filteredExercises.length !== 1 ? 's' : ''} encontrado{filteredExercises.length !== 1 ? 's' : ''} 
              {searchTerm && <span className="font-medium"> para "{searchTerm}"</span>}
            </>
          ) : (
            <>Descubre nuestra colección de {exercises.length} ejercicios</>
          )}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <div key={exercise.id} className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow">
            {/* Contenido de la tarjeta */}
            <div className="p-4">
              {/* Nombre del ejercicio */}
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {exercise.names.es}
              </h3>
              
              {/* Tags */}
              {exercise.tags && exercise.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {exercise.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                    >
                      {tag.name.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Equipamiento */}
              {exercise.equipment && exercise.equipment.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Equipamiento:</h4>
                  <div className="flex flex-wrap gap-1">
                    {exercise.equipment.map((eq, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-medium"
                      >
                        {eq.name.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Comentario */}
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Instrucciones:</h4>
                <p className="text-sm text-gray-600 line-clamp-4">
                  {exercise.comments?.es || exercise.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredExercises.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-xl text-gray-500 mb-2">No se encontraron ejercicios</p>
          <p className="text-gray-400">Intenta con otros términos de búsqueda</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}

      {exercises.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No se encontraron ejercicios</p>
        </div>
      )}
    </div>
  );
};