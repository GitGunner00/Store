"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast"

// Mock product data - in a real app, this would come from an API
const product = {
  id: 1,
  name: "Canadian Heritage Hoodie",
  price: 89.99,
  originalPrice: 119.99,
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  rating: 4.8,
  reviews: 124,
  description:
    "Embrace your Canadian pride with this premium heritage hoodie. Crafted from a soft cotton-polyester blend, featuring the iconic maple leaf design and built to withstand the Canadian climate.",
  features: [
    "Premium cotton-polyester blend",
    "Kangaroo pocket with hidden phone compartment",
    "Reinforced seams for durability",
    "Pre-shrunk fabric",
    "Unisex fit",
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: ["Red", "Black", "Navy", "Grey"],
  inStock: true,
  badge: "Best Seller",
}

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    date: "2024-01-15",
    comment: "Amazing quality! The fit is perfect and it's so comfortable. True to Canadian sizing.",
  },
  {
    id: 2,
    name: "Mike T.",
    rating: 4,
    date: "2024-01-10",
    comment: "Great hoodie, love the design. Shipping was fast across Canada.",
  },
  {
    id: 3,
    name: "Emma L.",
    rating: 5,
    date: "2024-01-05",
    comment: "Perfect for Canadian winters! Warm and stylish.",
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select size and color",
        description: "Both size and color are required to add to cart.",
        variant: "destructive",
      })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    })

    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
            />
            {product.badge && <Badge className="absolute top-4 left-4 bg-red-600">{product.badge}</Badge>}
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-red-600" : "border-gray-200"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold">${product.price} CAD</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice} CAD</span>
              )}
              {product.originalPrice && (
                <Badge variant="destructive">Save ${(product.originalPrice - product.price).toFixed(2)}</Badge>
              )}
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Size Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {product.colors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                <Heart className="mr-2 h-5 w-5" />
                Wishlist
              </Button>
              <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
            </div>
          </div>

          {/* Features */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <Truck className="h-8 w-8 mx-auto mb-2 text-red-600" />
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-gray-600">Orders over $75</p>
                </div>
                <div>
                  <Shield className="h-8 w-8 mx-auto mb-2 text-red-600" />
                  <p className="text-sm font-medium">Quality Guarantee</p>
                  <p className="text-xs text-gray-600">Premium materials</p>
                </div>
                <div>
                  <RotateCcw className="h-8 w-8 mx-auto mb-2 text-red-600" />
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-gray-600">30-day policy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Product Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{review.name}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Free Standard Shipping</h4>
                    <p className="text-gray-600">Orders over $75 CAD ship free across Canada (5-7 business days)</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Express Shipping</h4>
                    <p className="text-gray-600">$15 CAD - 2-3 business days</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Overnight Shipping</h4>
                    <p className="text-gray-600">$25 CAD - Next business day (major cities only)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
