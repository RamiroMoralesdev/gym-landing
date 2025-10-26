import { Card } from "@/components/ui/card"

const equipment = [
  {
    category: "Máquinas de Fuerza",
    items: [
      "Bancos Press Banca regulables",
      "Hammer",
      "Extensión de Cuádriceps",
      
    ],
    image: "/modern-gym-strength-machines.jpg",
  },
  {
    category: "Peso Libre",
    items: [
      "Barras Olímpicas",
      "Mancuernas 1-60kg",
      "Discos Bumper 5-20kg",
      "Tobilleras con Peso 1-15kg"
    ],
    image: "/free-weights-dumbbells-barbells-gym.jpg",
  },
  {
    category: "Calistenia",
    items: [
      "Barras Paralelas",
      "Barras de Dominadas",
      "Anillas Olímpicas",
      "TRX",
      "Cajones Pliométricos",
      "Bandas de Resistencia",
      "Lastres",
      "Mini-Paralelas",

    ],
    image: "/calisthenics-equipment-pull-up-bars-rings.jpg",
  },
  {
    category: "Cardio",
    items: ["Cintas de Correr",
       "Bicicletas Spinning",
       "Bicicleta Horizontal",
        ],
    image: "/cardio-machines-treadmill-bike-gym.jpg",
  },
]

export function Equipment() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Nuestro Equipamiento</h2>
          <p className="text-xl text-muted-foreground text-pretty">Tecnología de punta para maximizar tus resultados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {equipment.map((section, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src={section.image || "/placeholder.svg"}
                  alt={section.category}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-secondary/60 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-secondary-foreground">{section.category}</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="grid grid-cols-2 gap-3">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
