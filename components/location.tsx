export function Location() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Encuéntranos</h2>
          <p className="text-xl text-muted-foreground text-pretty">Ubicación céntrica y fácil acceso</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Dirección</h3>
              <p className="text-lg text-muted-foreground">
                Espora 4320
                <br />
                Funes, Santa Fe, Argentina
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Contacto</h3>
              <a href="https://wa.link/mshn9e" target="_blank" className="text-lg text-muted-foreground">
                WhatsApp: 3415891499
                
              </a>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Transporte</h3>
              <p className="text-lg text-muted-foreground">
                Colectivo Linea 142 Negro - Parada Jose Ingenieros
              </p>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg h-[400px] lg:h-auto">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1674.5687438435232!2d-60.84209605297481!3d-32.92096556108241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1761515905941!5m2!1ses!2sar" width="600" height="450" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
