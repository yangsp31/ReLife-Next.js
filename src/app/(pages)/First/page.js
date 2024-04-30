/**
 * v0 by Vercel.
 * @see https://v0.dev/t/z1M4piC1yDZ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-purple-100 to-blue-100">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Services
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Portfolio
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Beautiful Spaces, Beautiful Lives
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Elevate your space with our award-winning interior design. Let's turn your home into a masterpiece.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 lg:gap-2 xl:gap-4">
                <Input className="max-w-lg flex-1" placeholder="Generate" type="text" />
                <Button type="submit">Agree</Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By clicking "Agree," you consent to the use of cookies.
                <Link className="underline underline-offset-2" href="#">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">About Us</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We believe that great design has the power to transform lives. Our team of talented designers is
                dedicated to creating inspiring and beautiful spaces that reflect the unique style and personality of
                our clients.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Services</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We offer a wide range of services to meet the needs of our clients, including interior design, space
                planning, color consultation, and more. Whether you're looking to refresh your home with new furnishings
                or completely transform your space, we can help you bring your vision to life.
              </p>
            </div>
            <img
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height="500"
              src="/placeholder.svg"
              width="500"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Portfolio</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Browse our portfolio to see examples of our work and get inspired for your own project. From modern and
                minimalist to classic and traditional, we've created a wide range of beautiful designs for our clients.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <img
                  alt="Image"
                  className="aspect-video overflow-hidden rounded-t-xl object-cover object-center"
                  height="300"
                  src="/placeholder.svg"
                  width="500"
                />
                <CardHeader>
                  <h3 className="text-sm font-semibold">Project 1</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Description of the project</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Additional details about the project</p>
                </CardContent>
              </Card>
              <Card>
                <img
                  alt="Image"
                  className="aspect-video overflow-hidden rounded-t-xl object-cover object-center"
                  height="300"
                  src="/placeholder.svg"
                  width="500"
                />
                <CardHeader>
                  <h3 className="text-sm font-semibold">Project 2</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Description of the project</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Additional details about the project</p>
                </CardContent>
              </Card>
              <Card>
                <img
                  alt="Image"
                  className="aspect-video overflow-hidden rounded-t-xl object-cover object-center"
                  height="300"
                  src="/placeholder.svg"
                  width="500"
                />
                <CardHeader>
                  <h3 className="text-sm font-semibold">Project 3</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Description of the project</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Additional details about the project</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Contact Us</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Ready to take the next step? Contact us to schedule a consultation and start turning your design dreams
                into reality.
              </p>
            </div>
            <div className="mx-auto w-full max-w-[400px] space-y-4">
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <Input placeholder="Name" type="text" />
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Subject" type="text" />
                  <Textarea className="min-h-[100px]" placeholder="Message" />
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}