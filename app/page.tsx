import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Schedule } from "@/components/schedule"
import { Equipment } from "@/components/equipment"
import { Reviews } from "@/components/reviews"
import { Location } from "@/components/location"
import { SignupForm } from "@/components/signup-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Schedule />
      <Equipment />
      <Location />
      <Footer />
    </main>
  )
}
