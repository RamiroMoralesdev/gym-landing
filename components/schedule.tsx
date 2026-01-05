import { Card } from "@/components/ui/card"

const scheduleData = [
  { day: "Lunes - Viernes", hours: "7:00 AM - 21:00 PM" },
  { day: "Sábados Y Domingos", hours: "8:00 AM - 13:00 PM" },
]

const classes = [
  { name: "Musculación Libre", time: "Todo el día", level: "Todos los niveles" },
  { name: "Calistenia Funcional", time: "Todo el dia", level: "Todos los niveles" },
  { name: "Entrenamiento Personalizado", time: "Entrenamientos enfocados a tu nivel", level: "Personalizado" }
]

export function Schedule() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Horarios</h2>
          <p className="text-xl text-muted-foreground text-pretty">Entrena cuando mejor te convenga</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-6">Horario de Apertura</h3>
            <div className="space-y-4">
              {scheduleData.map((item, index) => (
                <Card key={index} className="p-6 bg-card">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">{item.day}</span>
                    <span className="text-primary font-bold text-lg">{item.hours}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Clases y Entrenamientos</h3>
            <div className="space-y-4">
              {classes.map((item, index) => (
                <Card key={index} className="p-6 bg-card">
                  <h4 className="font-bold text-lg mb-2">{item.name}</h4>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <span>{item.time}</span>
                    <span className="text-primary font-medium">{item.level}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
