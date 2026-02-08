import Link from "next/link"
import Stripe from "stripe"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"

interface Props {
    product: Stripe.Product
}

export default function ProductCard({product} : Props) {
  const price = product.default_price as Stripe.Price

  return (
    <Link href={"/products/1"} className="block h-full">
        <Card className="group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col border-1 border-[#000000]/15">
            {
              product.images &&
              product.images[0] && (
                <div className="relative h-80 w-full">
                   <Image 
                     alt={product.name}
                     src={product.images[0]}
                     layout="fill"
                     objectFit="cover"
                     className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
                   />
                </div>
              )
            }
          <CardHeader className="p-4">
            <CardTitle className="text-xl font-bold text-gray-800">{product.name}</CardTitle>
            <CardContent className="p-4 grow flex flex-col justify-between">
              {product.description && (
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              )}
               {price && price.unit_amount && (
                <p className="text-lg font-semibold text-gray-900">
                   ${(price.unit_amount / 100).toFixed(2)}
                </p>
               )}
               <Button className="mt-4 bg-black text-white">View Details</Button>
            </CardContent>
          </CardHeader>
        </Card>
     
    </Link>
  )
}
