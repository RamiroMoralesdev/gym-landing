import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { dni } = await request.json()

    if (!dni || typeof dni !== "string") {
      return NextResponse.json({ error: "DNI es requerido" }, { status: 400 })
    }

    const { data, error } = await supabase.rpc("get_socio_profile", {
      p_dni: dni.trim(),
    })

    if (error) {
      console.error("[PORTAL] RPC Error:", error)
      return NextResponse.json(
        { error: "Error al buscar el perfil", details: error.message },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Socio no encontrado o inactivo" },
        { status: 404 }
      )
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("[PORTAL] Error:", error)
    return NextResponse.json(
      { error: "Error interno del servidor", details: String(error) },
      { status: 500 }
    )
  }
}