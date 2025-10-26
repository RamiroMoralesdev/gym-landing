import { Dumbbell, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">Genesys GYM</span>
            </div>
            <p className="text-secondary-foreground/80 text-pretty">
              Tu destino para la transformación física y mental
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Horarios
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Equipamiento
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Servicios</h3>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>Musculación</li>
              <li>Calistenia</li>
              <li>Entrenamiento Personal</li>
              <li>Asesoría Nutricional</li>
              <li>Entrenamientos Personalizados</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Redes Sociales</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-secondary-foreground/60">
          <p>&copy; 2025 Power Gym. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
