
import { stripe } from "@/lib/stripe"
import {Button} from '@/components/ui/button'
import Link from "next/link";
import Image from "next/image";
import Carousel from "@/components/carousel";

export default async function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let products: any = { data: [] }
  
  if (stripe) {
    try {
      products = await stripe.products.list({
        expand: ["data.default_price"],
        limit: 5,
      })
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  return (
    <div>
      <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to My Ecommerce
            </h2>
            <p className="text-neutral-600">
              Discover the latest products at the best prices.
            </p>
            <Button 
              asChild 
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
            >
              <Link 
                href="/products"
                className="inline-flex items-center justify-center rounded-full px-6 py-3"
              >
                Browse All Products
              </Link>
            </Button>
          </div>
          {products.data.length > 0 && (
            <Image 
              alt="Banner Image" 
              width={450} 
              height={450} 
              src={products.data[0].images[0] || "/placeholder.svg"}
            />
          )}
        </div>
      </section>
      {products.data.length > 0 && (
        <section className="py-8">
          <Carousel products={products.data} />
        </section>
      )}
    </div>
  );
}
