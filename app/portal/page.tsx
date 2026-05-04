"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { AlertCircle, CheckCircle } from "lucide-react"

interface Exercise {
  name: string
  muscle_group: string | null
  sets: number | null
  reps: number | null
  rest_seconds: number | null
  weight: number | null
  order_index: number
}

interface Routine {
  id: string
  name: string
  estimated_duration: number | null
  notes: string | null
  exercises: Exercise[]
}

interface SocioProfile {
  id: number
  nombre: string
  apellido: string
  edad: number
  estado: string
  fecha_inicio: string
  plan_actual: string
  monto_plan: number
  ultimo_pago: string
  asistencias_mes: number
  proximos_turnos: Array<{
    fecha: string
    hora: string
  }>
  perfil?: {
    smoke: boolean | null
    status: string | null
    weight: number | null
    goals: string | null
    age: number | null
  } | null
  routines: Routine[]
}

export default function PortalPage() {
  const [dni, setDni] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [profile, setProfile] = useState<SocioProfile | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setProfile(null)
    setLoading(true)

    try {
      const response = await fetch("/api/portal/socio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dni: dni.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Error al buscar el perfil")
        return
      }

      setProfile(data)
    } catch (err) {
      setError("Error de conexión. Intenta nuevamente.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 to-gray-900 p-4">
      <div className="max-w-2xl mx-auto py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Portal Alumno</h1>
          <p className="text-gray-400">Accede a tu perfil con tu DNI</p>
        </div>

        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle>Buscar Perfil</CardTitle>
            <CardDescription>Ingresa tu número de DNI</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <Input
                type="text"
                placeholder="Ej: 12345678"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                disabled={loading}
                className="bg-gray-800 border-gray-700"
              />
              <Button type="submit" disabled={loading || !dni.trim()} className="w-full">
                {loading ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Buscando...
                  </>
                ) : (
                  "Buscar Perfil"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {profile && (
          <div className="space-y-6">
            {/* Bienvenida */}
            <Card className="bg-linear-to-r from-green-900/20 to-emerald-900/20 border-green-800">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <h2 className="text-2xl font-bold text-white">
                    ¡Bienvenido, {profile.nombre}!
                  </h2>
                </div>
                <p className="text-gray-300">Tu perfil fue cargado correctamente.</p>
              </CardContent>
            </Card>

            {/* Info Personal */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Nombre</p>
                    <p className="text-lg font-semibold text-white">{profile.nombre} {profile.apellido}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Edad</p>
                    <p className="text-lg font-semibold text-white">{profile.edad} años</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Estado</p>
                    <p className="text-lg font-semibold text-white">{profile.estado}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Miembro desde</p>
                    <p className="text-lg font-semibold text-white">
                      {new Date(profile.fecha_inicio).toLocaleDateString("es-AR")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Membresía */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Membresía</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Plan</p>
                    <p className="text-lg font-semibold text-white">{profile.plan_actual || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Monto</p>
                    <p className="text-lg font-semibold text-white">
                      {profile.monto_plan ? `$${profile.monto_plan}` : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Último Pago</p>
                    <p className="text-lg font-semibold text-white">
                      {profile.ultimo_pago
                        ? new Date(profile.ultimo_pago).toLocaleDateString("es-AR")
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Asistencias este mes</p>
                    <p className="text-lg font-semibold text-white">{profile.asistencias_mes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Perfil físico */}
            {profile.perfil && (
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Perfil Físico</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Peso</p>
                      <p className="text-lg font-semibold text-white">
                        {profile.perfil.weight ? `${profile.perfil.weight} kg` : "Sin registrar"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Fumador</p>
                      <p className="text-lg font-semibold text-white">
                        {profile.perfil.smoke === null ? "Sin registrar" : profile.perfil.smoke ? "Sí" : "No"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Objetivos</p>
                    <p className="mt-1 text-base text-white">
                      {profile.perfil.goals || "Sin objetivos cargados."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Próximos turnos */}
            {profile.proximos_turnos?.length > 0 && (
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Próximos Turnos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {profile.proximos_turnos.map((turno, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                      >
                        <span className="text-white">
                          {new Date(turno.fecha).toLocaleDateString("es-AR", {
                            weekday: "long",
                            day: "2-digit",
                            month: "long",
                          })}
                        </span>
                        <span className="text-gray-400">{turno.hora}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Rutinas */}
            {profile.routines?.length > 0 && (
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Mis Rutinas</CardTitle>
                  <CardDescription>Rutinas asignadas por el gimnasio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.routines.map((routine) => (
                    <div key={routine.id} className="rounded-lg border border-gray-700 bg-gray-800/60 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-white text-lg">{routine.name}</h3>
                        {routine.estimated_duration && (
                          <span className="text-sm text-gray-400">
                            {routine.estimated_duration} min
                          </span>
                        )}
                      </div>

                      {routine.notes && (
                        <p className="text-sm text-gray-400 mb-3">{routine.notes}</p>
                      )}

                      {routine.exercises?.length > 0 && (
                        <div className="space-y-2">
                          {routine.exercises.map((exercise, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 bg-gray-900 rounded-lg"
                            >
                              <div>
                                <p className="font-medium text-white">{exercise.name}</p>
                                {exercise.muscle_group && (
                                  <p className="text-xs text-gray-500">{exercise.muscle_group}</p>
                                )}
                              </div>
                              <div className="flex gap-3 text-sm text-gray-400 text-right">
                                {exercise.sets && exercise.reps && (
                                  <span>{exercise.sets} × {exercise.reps}</span>
                                )}
                                {exercise.weight && (
                                  <span>{exercise.weight} kg</span>
                                )}
                                {exercise.rest_seconds && (
                                  <span>{exercise.rest_seconds}s descanso</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {!profile && !error && (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <p className="text-center text-gray-400">
                Ingresa tu DNI para ver tu perfil, membresía, turnos y rutinas.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}