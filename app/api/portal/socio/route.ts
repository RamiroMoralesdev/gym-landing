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
        { error: "DNI es requerido" },
        { status: 400 }
      )
    }

    console.log(`[PORTAL] Buscando socio con DNI: ${dni}`)

    // Primero intentar con la función RPC
    const { data, error } = await supabase.rpc("get_socio_profile", {
      p_dni: dni.trim(),
    })

    if (error) {
      console.error("[PORTAL] RPC Error:", error)
      
      // Si la función no existe, retornar error específico
      if (error.message?.includes("does not exist")) {
        return NextResponse.json(
          { 
            error: "La función no está configurada en Supabase. Ver documentación: PORTAL_SETUP.md",
            details: error.message
          },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { error: "Error al buscar el perfil", details: error.message },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      console.log(`[PORTAL] Socio no encontrado o inactivo para DNI: ${dni}`)
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

    const { data: reservasData, error: reservasError } = await supabase
      .from("turnos_reservas")
      .select(`
        id,
        recurrente,
        weekday,
        hour,
        active,
        created_at,
        turno_slot_id,
        turnos_slots (
          id,
          starts_at,
          max_capacity
        )
      `)
      .eq("socio_id", socioId)
      .eq("active", true)
      .order("created_at", { ascending: false })

    if (reservasError) {
      console.error("[PORTAL] Turnos Error:", reservasError)
    }

    const turnosReservas = (reservasData ?? []).map((reserva) => {
      const slot = Array.isArray(reserva.turnos_slots)
        ? reserva.turnos_slots[0]
        : reserva.turnos_slots

      return {
        id: reserva.id,
        active: reserva.active,
        recurrente: reserva.recurrente,
        turno_slot_id: reserva.turno_slot_id,
        created_at: reserva.created_at,
        weekday: reserva.weekday,
        weekday_label:
          typeof reserva.weekday === "number"
            ? WEEKDAY_LABELS[reserva.weekday] ?? null
            : null,
        hour: reserva.hour,
        hour_label: typeof reserva.hour === "number" ? formatHour(reserva.hour) : null,
        slot: slot
          ? {
              id: slot.id,
              starts_at: slot.starts_at,
              max_capacity: slot.max_capacity,
            }
          : null,
      }
    })

    const profile = {
      ...data[0],
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
      proximos_turnos: buildUpcomingTurns(turnosReservas),
    }

    console.log(`[PORTAL] Perfil encontrado:`, profile)
    return NextResponse.json(profile)
  } catch (error) {
    console.error("[PORTAL] Error:", error)
    return NextResponse.json(
      { error: "Error interno del servidor", details: String(error) },
      { status: 500 }
    )
  }
}
