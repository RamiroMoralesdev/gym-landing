import { Card } from "@/components/ui/card"
import { Dumbbell, Users, Trophy, Clock } from "lucide-react"

const features = [
  {
    icon: Dumbbell,
    title: "Calistenia y Pesas en un solo lugar",
    description: "Equipamiento profesional para todos los niveles y edades",
  },
  {
    icon: Users,
    title: "Entrenadores Certificados",
    description: "Personal altamente calificado para guiarte en tu transformación",
  },
  {
    icon: Trophy,
    title: "Resultados Garantizados",
    description: "Programas personalizados diseñados para alcanzar tus objetivos",
  },
  {
    icon: Clock,
    title: "Horarios Flexibles",
    description: "Abierto 7 días a la semana con horarios adaptados a tu rutina",
  },
]

export function About() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">¿Por Qué Elegirnos?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Somos más que un gimnasio, somos tu partner en el camino hacia una vida más fuerte y saludable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-pretty">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
