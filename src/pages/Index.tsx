import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/Navbar"
import { ArrowRight, Package, TrendingUp, Zap, Shield, BarChart3, Clock } from "lucide-react"

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up space-y-6">
              <div className="inline-block px-4 py-2 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] text-sm font-medium">
                🚀 Automate Your Dropshipping Business
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Scale Your{" "}
                <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
                  Dropshipping
                </span>{" "}
                Business on Autopilot
              </h1>
              <p className="text-xl text-muted-foreground">
                Import products from Amazon and AliExpress to eBay automatically. Monitor prices, manage inventory, and fulfill orders with ease.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/auth">
                  <Button variant="hero" size="xl" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="xl">
                    View Demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[hsl(var(--success))]" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[hsl(var(--success))]" />
                  <span>Setup in 5 minutes</span>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 gradient-hero blur-3xl opacity-20 rounded-3xl"></div>
              <div className="relative rounded-2xl shadow-2xl border border-border bg-muted/50 h-80 flex items-center justify-center">
                <Package className="w-24 h-24 text-muted-foreground/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful automation tools designed for serious dropshippers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-glow transition-all duration-300 gradient-card border-border/50">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-[hsl(var(--primary)/0.1)]">
                <Package className="h-6 w-6 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Product Import</h3>
              <p className="text-muted-foreground">
                Import products from Amazon and AliExpress with one click. Automatic price conversion and optimization.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-glow transition-all duration-300 gradient-card border-border/50">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-[hsl(var(--secondary)/0.1)]">
                <TrendingUp className="h-6 w-6 text-[hsl(var(--secondary))]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Price Monitoring</h3>
              <p className="text-muted-foreground">
                Automatically track supplier prices and update your listings to maintain profit margins.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-glow transition-all duration-300 gradient-card border-border/50">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-[hsl(var(--accent)/0.1)]">
                <Zap className="h-6 w-6 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Order Fulfillment</h3>
              <p className="text-muted-foreground">
                Orders are automatically forwarded to suppliers. Track everything from one dashboard.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-glow transition-all duration-300 gradient-card border-border/50">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-[hsl(var(--success)/0.1)]">
                <Shield className="h-6 w-6 text-[hsl(var(--success))]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Inventory Sync</h3>
              <p className="text-muted-foreground">
                Real-time inventory tracking prevents overselling. Automatic stock level updates.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-glow transition-all duration-300 gradient-card border-border/50">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-[hsl(var(--primary)/0.1)]">
                <BarChart3 className="h-6 w-6 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Track sales, profits, and performance metrics. Make data-driven decisions.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-glow transition-all duration-300 gradient-card border-border/50">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-[hsl(var(--secondary)/0.1)]">
                <Clock className="h-6 w-6 text-[hsl(var(--secondary))]" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Automation</h3>
              <p className="text-muted-foreground">
                Your business runs on autopilot. Focus on growth while we handle the rest.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="gradient-hero p-12 text-center text-white border-0 shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Scale Your Dropshipping Business?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of successful dropshippers using DropFlow to automate their business
            </p>
            <Link to="/auth">
              <Button variant="secondary" size="xl" className="group">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2026 DropFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
