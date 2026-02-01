import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Play, Pause, Settings, Package, DollarSign, TrendingUp, Loader2 } from "lucide-react"

export default function Scraper() {
  const [isRunning, setIsRunning] = useState(false)
  const [keyword, setKeyword] = useState("")

  const scrapedProducts = [
    { id: 1, name: "Wireless Earbuds Noise Cancelling", price: 45.99, amazonPrice: 32.00, profit: 13.99, rating: 4.5, reviews: 1234 },
    { id: 2, name: "Bluetooth Speaker Waterproof", price: 29.99, amazonPrice: 18.00, profit: 11.99, rating: 4.3, reviews: 892 },
    { id: 3, name: "Smart Watch Fitness Tracker", price: 89.99, amazonPrice: 52.00, profit: 37.99, rating: 4.7, reviews: 2341 },
    { id: 4, name: "Phone Stand Adjustable", price: 15.99, amazonPrice: 6.50, profit: 9.49, rating: 4.4, reviews: 567 },
    { id: 5, name: "USB C Hub Multiport Adapter", price: 35.99, amazonPrice: 19.00, profit: 16.99, rating: 4.6, reviews: 1089 },
  ]

  const stats = {
    productsFound: 156,
    avgProfit: 18.45,
    topCategory: "Electronics",
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Product Scraper</h1>
              <p className="text-muted-foreground">Find profitable products to sell</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button 
                variant={isRunning ? "destructive" : "hero"}
                className="gap-2"
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Stop Scraper
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Start Scraper
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Products Found</p>
                    <p className="text-2xl font-bold">{stats.productsFound}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <DollarSign className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Profit</p>
                    <p className="text-2xl font-bold">${stats.avgProfit}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Top Category</p>
                    <p className="text-2xl font-bold">{stats.topCategory}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Search Criteria</CardTitle>
              <CardDescription>Configure what products to search for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label>Keyword</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="e.g., wireless earbuds" 
                      className="pl-10"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Min Profit</Label>
                  <Input type="number" placeholder="$10" />
                </div>
                <div className="space-y-2">
                  <Label>Max Price</Label>
                  <Input type="number" placeholder="$100" />
                </div>
                <div className="space-y-2">
                  <Label>Min Rating</Label>
                  <Input type="number" placeholder="4.0" step="0.1" max="5" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isRunning && <Loader2 className="h-5 w-5 animate-spin" />}
                Scraped Products
              </CardTitle>
              <CardDescription>
                {isRunning ? "Searching for profitable products..." : "Products matching your criteria"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Sell Price</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Cost</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Profit</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Rating</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Reviews</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scrapedProducts.map((product) => (
                      <tr key={product.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <Package className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">${product.price.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right text-muted-foreground">${product.amazonPrice.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right text-green-600 font-medium">${product.profit.toFixed(2)}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center gap-1">
                            ⭐ {product.rating}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-muted-foreground">{product.reviews.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="outline" size="sm">
                            Import
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
