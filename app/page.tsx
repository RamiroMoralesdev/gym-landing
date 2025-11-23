import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Schedule } from "@/components/schedule"
import { Equipment } from "@/components/equipment"
import { Reviews } from "@/components/reviews"
import { Location } from "@/components/location"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav>
        <ul>
          <li>
            <button>
              <Link href="/portal">Portal Alumnos</Link>
            </button>
          </li>
        </ul>
      </nav>
      
      <Hero />
      <About />
      <Schedule />
      <Equipment />
      <Reviews />
      <Location />
      <Footer />
    </main>
  )
}
