"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { AlertCircle, CheckCircle } from "lucide-react"

interface SocioProfile {
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
  socio_profile?: {
    id: number
    socio_id: number
    smoke: boolean | null
    status: string | null
    weight: number | null
    goals: string | null
    age: number | null
  } | null
  turnos_reservas?: Array<{
    id: number
    active: boolean
    recurrente: boolean
    created_at: string
    turno_slot_id: number | null
    weekday: number | null
    weekday_label: string | null
    hour: number | null
    hour_label: string | null
    slot: {
      id: number
      starts_at: string
      max_capacity: number
    } | null
  }>
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
        headers: {
          "Content-Type": "application/json",
        },
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Portal Alumno</h1>
          <p className="text-gray-400">Accede a tu perfil con tu DNI</p>
        </div>

        {/* Search Form */}
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
              <Button
                type="submit"
                disabled={loading || !dni.trim()}
                className="w-full"
              >
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

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Profile */}
        {profile && (
          <div className="space-y-6">
            {/* Welcome Card */}
            <Card className="bg-linear-to-r from-green-900/20 to-emerald-900/20 border-green-800">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <h2 className="text-2xl font-bold text-white">
                    ¡Bienvenido, {profile.nombre}!
                  </h2>
                </div>
                <p className="text-gray-300">
                  Tu perfil fue cargado correctamente. Aquí puedes ver tus datos.
                </p>
              </CardContent>
            </Card>

            {/* Personal Info */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Nombre</p>
                    <p className="text-lg font-semibold text-white">
                      {profile.nombre} {profile.apellido}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Edad</p>
                    <p className="text-lg font-semibold text-white">{profile.edad} años</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Estado</p>
                    <p className="text-lg font-semibold text-white capitalize">{profile.estado}</p>
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

            {/* Membership Info */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Información de Membresía</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Plan Actual</p>
                    <p className="text-lg font-semibold text-white">{profile.plan_actual}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Monto</p>
                    <p className="text-lg font-semibold text-white">${profile.monto_plan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Último Pago</p>
                    <p className="text-lg font-semibold text-white">
                      {new Date(profile.ultimo_pago).toLocaleDateString("es-AR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Asistencias este mes</p>
                    <p className="text-lg font-semibold text-white">{profile.asistencias_mes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {profile.socio_profile && (
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Socio Profile</CardTitle>
                  <CardDescription>
                    Datos físicos y objetivos cargados en tu perfil de alumno.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-400">Estado del perfil</p>
                      <p className="text-lg font-semibold text-white">
                        {profile.socio_profile.status || "Sin definir"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Peso</p>
                      <p className="text-lg font-semibold text-white">
                        {profile.socio_profile.weight ? `${profile.socio_profile.weight} kg` : "Sin registrar"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Edad de perfil</p>
                      <p className="text-lg font-semibold text-white">
                        {profile.socio_profile.age ? `${profile.socio_profile.age} años` : "Sin registrar"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Fumador</p>
                      <p className="text-lg font-semibold text-white">
                        {profile.socio_profile.smoke === null
                          ? "Sin registrar"
                          : profile.socio_profile.smoke
                            ? "Sí"
                            : "No"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Objetivos</p>
                    <p className="mt-1 text-base text-white">
                      {profile.socio_profile.goals || "Todavía no cargaste objetivos."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Sessions */}
            {profile.proximos_turnos && profile.proximos_turnos.length > 0 && (
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
                          {new Date(turno.fecha).toLocaleDateString("es-AR")}
                        </span>
                        <span className="text-gray-400">{turno.hora}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {profile.turnos_reservas && profile.turnos_reservas.length > 0 && (
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Turnos Reservados</CardTitle>
                  <CardDescription>
                    Reservas activas registradas para tu perfil.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {profile.turnos_reservas.map((reserva) => (
                      <div
                        key={reserva.id}
                        className="rounded-lg border border-gray-800 bg-gray-800/60 p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold text-white">
                              {reserva.slot?.starts_at
                                ? new Date(reserva.slot.starts_at).toLocaleDateString("es-AR", {
                                    weekday: "long",
                                    day: "2-digit",
                                    month: "long",
                                  })
                                : reserva.weekday_label || "Reserva sin fecha exacta"}
                            </p>
                            <p className="text-sm text-gray-400">
                              {reserva.slot?.starts_at
                                ? new Date(reserva.slot.starts_at).toLocaleTimeString("es-AR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : reserva.hour_label || "Horario a confirmar"}
                            </p>
                          </div>
                          <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                            {reserva.recurrente ? "Recurrente" : "Reserva puntual"}
                          </span>
                        </div>

                        <div className="mt-3 grid gap-2 text-sm text-gray-300 sm:grid-cols-2">
                          <p>
                            <span className="text-gray-500">ID reserva:</span> {reserva.id}
                          </p>
                          <p>
                            <span className="text-gray-500">Slot:</span>{" "}
                            {reserva.turno_slot_id ?? "Sin slot asignado"}
                          </p>
                          <p>
                            <span className="text-gray-500">Capacidad:</span>{" "}
                            {reserva.slot?.max_capacity ?? "No informada"}
                          </p>
                          <p>
                            <span className="text-gray-500">Creada:</span>{" "}
                            {new Date(reserva.created_at).toLocaleDateString("es-AR")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Info Text */}
        {!profile && !error && (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <p className="text-center text-gray-400">
                Ingresa tu DNI para ver tu perfil, estado de membresía, asistencias y próximos turnos.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
