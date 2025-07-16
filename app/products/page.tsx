"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, Filter, Grid, List } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Canadian Heritage Hoodie",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    category: "Hoodies",
    badge: "Sale",
  },
  {
    id: 2,
    name: "Maple Leaf Toque",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    category: "Accessories",
    badge: "New",
  },
  {
    id: 3,
    name: "Northern Lights Jacket",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 156,
    category: "Jackets",
  },
  {
    id: 4,
    name: "Wilderness Backpack",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 78,
    category: "Accessories",
  },
  {
    id: 5,
    name: "Arctic Explorer Parka",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 203,
    category: "Jackets",
    badge: "Premium",
  },
  {
    id: 6,
    name: "Flannel Shirt - Red",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 92,
    category: "Shirts",
  },
]

const categories = ["All", "Hoodies", "Jackets", "Shirts", "Accessories"]
const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Number.POSITIVE_INFINITY },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory
    const priceMatch =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some((range) => {
        const priceRange = priceRanges.find((r) => r.label === range)
        return priceRange && product.price >= priceRange.min && product.price <= priceRange.max
      })
    return categoryMatch && priceMatch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Our Products</h1>
        <p className="text-gray-600">Discover our complete collection of Canadian-inspired clothing and accessories</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-6">
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </h3>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="text-red-600"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label key={range.label} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={selectedPriceRanges.includes(range.label)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedPriceRanges([...selectedPriceRanges, range.label])
                        } else {
                          setSelectedPriceRanges(selectedPriceRanges.filter((r) => r !== range.label))
                        }
                      }}
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <p className="text-gray-600">
              Showing {sortedProducts.length} of {products.length} products
            </p>

            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {sortedProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-64 object-cover rounded-t-lg"
                        />
                        {product.badge && <Badge className="absolute top-3 left-3 bg-red-600">{product.badge}</Badge>}
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{product.name}</h3>

                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600 ml-1">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">${product.price} CAD</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                          <Link href={`/products/${product.id}`}>
                            <Button size="sm">View</Button>
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex p-4 gap-4">
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        {product.badge && (
                          <Badge className="absolute top-2 left-2 bg-red-600 text-xs">{product.badge}</Badge>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{product.name}</h3>

                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600 ml-1">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">${product.price} CAD</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                          <Link href={`/products/${product.id}`}>
                            <Button size="sm">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
