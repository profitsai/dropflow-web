import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Store, Search, Package, ExternalLink, Loader2, CheckCircle, ArrowRight, Copy } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL || 'https://dropflow-production.up.railway.app';

interface ScrapedTitle {
  title: string;
  amazonUrl?: string;
  amazonTitle?: string;
  matchScore?: number;
}

export default function Scraper() {
  const [storeUrl, setStoreUrl] = useState("")
  const [maxPages, setMaxPages] = useState("20")
  const [isScrapingStore, setIsScrapingStore] = useState(false)
  const [isMatchingAmazon, setIsMatchingAmazon] = useState(false)
  const [scrapedTitles, setScrapedTitles] = useState<ScrapedTitle[]>([])
  const [storeName, setStoreName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [matchResults, setMatchResults] = useState<{matched: number; total: number; matchRate: number} | null>(null)

  async function handleScrapeStore() {
    if (!storeUrl) return
    
    setIsScrapingStore(true)
    setError(null)
    setScrapedTitles([])
    setMatchResults(null)
    
    try {
      const response = await fetch(`${API_URL}/api/scraper/ebay-store`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          store_url: storeUrl,
          max_pages: parseInt(maxPages) || 20
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to scrape store')
      }
      
      setStoreName(data.store_name)
      setScrapedTitles(data.titles.map((title: string) => ({ title })))
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scraping failed')
    } finally {
      setIsScrapingStore(false)
    }
  }

  async function handleMatchAmazon() {
    if (scrapedTitles.length === 0) return
    
    setIsMatchingAmazon(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_URL}/api/scraper/match-amazon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          titles: scrapedTitles.map(t => t.title),
          domain: 'com.au'
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to match products')
      }
      
      // Update titles with match results
      setScrapedTitles(data.results.map((r: any) => ({
        title: r.ebay_title,
        amazonUrl: r.amazon_url,
        amazonTitle: r.amazon_title,
        matchScore: r.match_score
      })))
      
      setMatchResults({
        matched: data.matched,
        total: data.total,
        matchRate: data.match_rate
      })
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Matching failed')
    } finally {
      setIsMatchingAmazon(false)
    }
  }

  function copyAmazonLinks() {
    const links = scrapedTitles
      .filter(t => t.amazonUrl)
      .map(t => t.amazonUrl)
      .join('\n')
    navigator.clipboard.writeText(links)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Smart Scraper</h1>
            <p className="text-muted-foreground">Scrape competitor eBay stores and find matching Amazon products</p>
          </div>

          {/* Step 1: Scrape eBay Store */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Step 1: Scrape eBay Store
              </CardTitle>
              <CardDescription>
                Enter an eBay store URL to extract all their product titles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="md:col-span-3 space-y-2">
                    <Label>eBay Store URL</Label>
                    <Input
                      placeholder="https://www.ebay.com.au/str/storename"
                      value={storeUrl}
                      onChange={(e) => setStoreUrl(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Pages</Label>
                    <Input
                      type="number"
                      placeholder="20"
                      value={maxPages}
                      onChange={(e) => setMaxPages(e.target.value)}
                    />
                  </div>
                </div>
                
                <Button 
                  variant="hero" 
                  onClick={handleScrapeStore}
                  disabled={!storeUrl || isScrapingStore}
                >
                  {isScrapingStore ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Scraping Store...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Scrape Store
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Error Display */}
          {error && (
            <Card className="mb-6 border-destructive">
              <CardContent className="py-4">
                <p className="text-destructive">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {scrapedTitles.length > 0 && (
            <>
              {/* Step 2: Match to Amazon */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowRight className="h-5 w-5" />
                    Step 2: Find Amazon Matches
                  </CardTitle>
                  <CardDescription>
                    Search Amazon for matching products (processes up to 100 titles)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        Found <span className="font-bold text-foreground">{scrapedTitles.length}</span> products from {storeName}
                      </p>
                      {matchResults && (
                        <p className="text-sm text-green-600">
                          Matched {matchResults.matched}/{matchResults.total} ({matchResults.matchRate}%)
                        </p>
                      )}
                    </div>
                    <Button 
                      variant="hero" 
                      onClick={handleMatchAmazon}
                      disabled={isMatchingAmazon || scrapedTitles.length === 0}
                    >
                      {isMatchingAmazon ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Matching...
                        </>
                      ) : (
                        <>
                          <Package className="h-4 w-4 mr-2" />
                          Find Amazon Matches
                        </>
                      )}
                    </Button>
                    {matchResults && matchResults.matched > 0 && (
                      <Button variant="outline" onClick={copyAmazonLinks}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Links
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Products List */}
              <Card>
                <CardHeader>
                  <CardTitle>Scraped Products ({scrapedTitles.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-[600px] overflow-y-auto space-y-2">
                    {scrapedTitles.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`p-3 rounded-lg border ${item.amazonUrl ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-muted/30'}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.title}</p>
                            {item.amazonTitle && (
                              <p className="text-xs text-muted-foreground mt-1">
                                → {item.amazonTitle} ({item.matchScore}% match)
                              </p>
                            )}
                          </div>
                          {item.amazonUrl ? (
                            <a 
                              href={item.amazonUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-green-600 hover:underline"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : item.matchScore !== undefined ? (
                            <span className="text-xs text-muted-foreground">No match</span>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Empty State */}
          {scrapedTitles.length === 0 && !isScrapingStore && (
            <Card>
              <CardContent className="py-12">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Store className="h-12 w-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No products scraped yet</p>
                  <p className="text-sm text-center max-w-md">
                    Enter an eBay store URL above to scrape their product catalog, 
                    then match those products to Amazon listings.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
