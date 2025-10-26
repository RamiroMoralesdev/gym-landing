import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "Carlos Martínez",
    rating: 5,
    text: "El mejor gimnasio de la zona. Equipamiento de primera y ambiente motivador. He ganado 8kg de músculo en 6 meses.",
    date: "Hace 2 semanas",
  },
  {
    name: "Ana Rodríguez",
    rating: 5,
    text: "Los entrenadores son increíbles, siempre dispuestos a ayudar. Las instalaciones están impecables y el área de calistenia es espectacular.",
    date: "Hace 1 mes",
  },
  {
    name: "Miguel Sánchez",
    rating: 5,
    text: "Llevo 2 años entrenando aquí y no cambiaría por nada. La variedad de máquinas y los horarios flexibles son perfectos para mi rutina.",
    date: "Hace 3 semanas",
  },
  {
    name: "Laura Fernández",
    rating: 5,
    text: "Ambiente familiar y profesional. Las clases de calistenia funcional son mi favoritas. Totalmente recomendado.",
    date: "Hace 1 semana",
  },
]

export function Reviews() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Lo Que Dicen Nuestros Miembros</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-xl font-semibold">5.0 en Google</span>
          </div>
          <p className="text-muted-foreground">Basado en más de 200 reseñas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="p-6">
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm mb-4 text-pretty">{review.text}</p>
              <div className="border-t pt-4">
                <p className="font-semibold">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
