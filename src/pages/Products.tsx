import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Package, Search, Plus, Edit, Trash2, ExternalLink } from "lucide-react"

const mockProducts = [
  { id: 1, name: "Wireless Earbuds Pro", sku: "WEP-001", source: "Amazon", price: 79.99, cost: 45.00, stock: 234, status: "Active" },
  { id: 2, name: "Smart Watch Series X", sku: "SWS-002", source: "AliExpress", price: 199.99, cost: 120.00, stock: 89, status: "Active" },
  { id: 3, name: "Bluetooth Speaker", sku: "BTS-003", source: "Amazon", price: 49.99, cost: 28.00, stock: 156, status: "Active" },
  { id: 4, name: "Phone Case Premium", sku: "PCP-004", source: "AliExpress", price: 24.99, cost: 8.00, stock: 0, status: "Out of Stock" },
  { id: 5, name: "USB-C Hub 7-in-1", sku: "UCH-005", source: "Amazon", price: 59.99, cost: 32.00, stock: 67, status: "Active" },
  { id: 6, name: "LED Desk Lamp", sku: "LDL-006", source: "AliExpress", price: 34.99, cost: 15.00, stock: 142, status: "Active" },
]

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Products</h1>
              <p className="text-muted-foreground">Manage your product listings</p>
            </div>
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">All Sources</Button>
                  <Button variant="outline">All Status</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {filteredProducts.length} Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">SKU</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Source</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Price</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Cost</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Profit</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Stock</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <Package className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-sm">{product.sku}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            product.source === "Amazon" 
                              ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}>
                            {product.source}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">${product.price.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right text-muted-foreground">${product.cost.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right text-green-600 font-medium">
                          ${(product.price - product.cost).toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right">{product.stock}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            product.status === "Active"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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
