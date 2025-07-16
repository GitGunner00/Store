import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const orderNumber = "TN-" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Order Number:</span>
              <span className="font-mono font-bold">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery:</span>
              <span>5-7 business days</span>
            </div>
            <div className="flex justify-between">
              <span>Tracking Available:</span>
              <span>Within 24 hours</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <Package className="h-12 w-12 text-red-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Order Processing</h3>
            <p className="text-sm text-gray-600">Your order is being prepared</p>
          </div>
          <div className="text-center">
            <Truck className="h-12 w-12 text-red-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Shipping</h3>
            <p className="text-sm text-gray-600">Free shipping across Canada</p>
          </div>
          <div className="text-center">
            <Mail className="h-12 w-12 text-red-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Updates</h3>
            <p className="text-sm text-gray-600">Email notifications sent</p>
          </div>
        </div>

        <div className="space-y-4">
          <Link href="/products">
            <Button size="lg" className="w-full sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
          <div>
            <Link href="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
