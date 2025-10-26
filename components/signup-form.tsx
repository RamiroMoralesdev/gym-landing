"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Aquí iría la lógica para enviar el formulario
    alert("¡Gracias por tu interés! Te contactaremos pronto.")
  }

  return (
    <section className="py-20 px-4 bg-secondary text-secondary-foreground">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Comienza Tu Transformación Hoy</h2>
          <p className="text-xl text-secondary-foreground/90 text-pretty">
            Completa el formulario y nos pondremos en contacto contigo
          </p>
        </div>

        <Card className="p-8 bg-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+34 600 000 000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plan">Plan de Interés</Label>
              <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
                <SelectTrigger id="plan">
                  <SelectValue placeholder="Selecciona un plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensual">Mensual - €49/mes</SelectItem>
                  <SelectItem value="trimestral">Trimestral - €129/3 meses</SelectItem>
                  <SelectItem value="anual">Anual - €449/año</SelectItem>
                  <SelectItem value="personal">Entrenamiento Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" size="lg" className="w-full text-lg">
              Solicitar Información
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Al enviar este formulario, aceptas recibir comunicaciones sobre nuestros servicios
            </p>
          </form>
        </Card>
      </div>
    </section>
  )
}
