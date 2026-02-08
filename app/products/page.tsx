import ProductList from "@/components/product-list"
import { stripe } from "@/lib/stripe"

export default async function ProductsPage() {
  let products = { data: [] }

  if (!stripe) {
    console.error("Stripe is not configured. Please check STRIPE_SECRET_KEY environment variable.")
    return (
      <div className="pb-8">
        <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">All Products</h1>
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Error: Stripe is not properly configured.</p>
        </div>
      </div>
    )
  }

  try {
    products = await stripe.products.list({
      expand: ["data.default_price"],
    })
  } catch (error) {
    console.error("Error fetching products from Stripe:", error)
    return (
      <div className="pb-8">
        <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">All Products</h1>
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Error loading products. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-8">
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">All Products</h1>
      <ProductList products={products.data}/>
    </div>
  )
}
