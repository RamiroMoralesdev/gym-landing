// Agrégalo en tu navbar/header para que los usuarios puedan acceder al portal
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

export function PortalLink() {
  return (
    <Link href="/portal">
      <Button variant="outline" size="sm" className="gap-2">
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">Portal Alumno</span>
      </Button>
    </Link>
  )
}
