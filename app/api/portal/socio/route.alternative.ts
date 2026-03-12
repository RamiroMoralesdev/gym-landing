// Alternativa usando consulta SQL directa en lugar de RPC
// Descomenta esta versión si prefieres usar la consulta SQL directa

import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const WEEKDAY_LABELS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
]

function formatHour(hour: number | null) {
  if (hour === null || Number.isNaN(hour)) {
    return null
  }

  return `${String(hour).padStart(2, "0")}:00`
}

function buildUpcomingTurns(
  turnosReservas: Array<{
    slot: {
      starts_at: string
    } | null
  }>
) {
  const now = Date.now()

  return turnosReservas
    .filter((reserva) => {
      if (!reserva.slot?.starts_at) {
        return false
      }

      const slotDate = new Date(reserva.slot.starts_at).getTime()
      return Number.isFinite(slotDate) && slotDate > now
    })
    .sort(
      (firstReserva, secondReserva) =>
        new Date(firstReserva.slot!.starts_at).getTime() -
        new Date(secondReserva.slot!.starts_at).getTime()
    )
    .map((reserva) => ({
      fecha: reserva.slot!.starts_at,
      hora: new Date(reserva.slot!.starts_at).toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }))
    .slice(0, 5)
}

export async function POST(request: NextRequest) {
  try {
    const { dni } = await request.json()

    if (!dni || typeof dni !== "string") {
      return NextResponse.json(
        { error: "DNI is required" },
        { status: 400 }
      )
    }

    // Usar consulta SQL directa en lugar de RPC
    const { data, error } = await supabase
      .from("socios")
      .select(`
        id,
        name,
        surname,
        age,
        status,
        date_start,
        last_payment_date,
        pagos(plan),
        asistencias(id),
        turnos_reservas(
          id,
          recurrente,
          weekday,
          hour,
          active,
          created_at,
          turno_slot_id,
          turnos_slots(id, starts_at, max_capacity)
        )
      `)
      .eq("id", Number.parseInt(dni.trim(), 10))
      .eq("status", true)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: "Socio no encontrado o inactivo" },
        { status: 404 }
      )
    }

    const socioId = Number.parseInt(dni.trim(), 10)

    const { data: socioProfileData, error: socioProfileError } = await supabase
      .from("perfil_socios")
      .select(`
        id,
        socio_id,
        smoke,
        status,
        weight,
        goals,
        age
      `)
      .eq("socio_id", socioId)
      .maybeSingle()

    if (socioProfileError) {
      console.error("[PORTAL] Socio Profile Error:", socioProfileError)
    }

    // Procesar los datos
    const latestPayment = data.pagos?.[0]
    const thisMonthAttendance = data.asistencias?.filter((a: any) => {
      const attendanceDate = new Date(a.created_at || new Date())
      const now = new Date()
      return (
        attendanceDate.getMonth() === now.getMonth() &&
        attendanceDate.getFullYear() === now.getFullYear()
      )
    }).length || 0

    const turnosReservas = data.turnos_reservas
      ?.map((tr: any) => ({
        id: tr.id,
        active: tr.active ?? true,
        recurrente: tr.recurrente ?? false,
        turno_slot_id: tr.turno_slot_id ?? null,
        created_at: tr.created_at ?? new Date().toISOString(),
        weekday: tr.weekday ?? null,
        weekday_label: typeof tr.weekday === "number" ? WEEKDAY_LABELS[tr.weekday] ?? null : null,
        hour: tr.hour ?? null,
        hour_label: typeof tr.hour === "number" ? formatHour(tr.hour) : null,
        slot: tr.turnos_slots
          ? {
              id: tr.turnos_slots.id,
              starts_at: tr.turnos_slots.starts_at,
              max_capacity: tr.turnos_slots.max_capacity ?? null,
            }
          : null,
      }))
      || []

    const upcomingTurns = buildUpcomingTurns(turnosReservas)

    const profile = {
      id: data.id,
      nombre: data.name,
      apellido: data.surname,
      edad: data.age,
      estado: data.status ? "Activo" : "Inactivo",
      fecha_inicio: data.date_start,
      plan_actual: latestPayment?.plan || "Sin plan",
      monto_plan: 0,
      ultimo_pago: data.last_payment_date,
      asistencias_mes: thisMonthAttendance,
      proximos_turnos: upcomingTurns,
      socio_profile: socioProfileData
        ? {
            id: socioProfileData.id,
            socio_id: socioProfileData.socio_id,
            smoke: socioProfileData.smoke,
            status: socioProfileData.status,
            weight: socioProfileData.weight,
            goals: socioProfileData.goals,
            age: socioProfileData.age,
          }
        : null,
      turnos_reservas: turnosReservas,
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
