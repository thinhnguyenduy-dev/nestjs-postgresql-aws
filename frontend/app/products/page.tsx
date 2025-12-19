'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Search, Filter, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import apiClient from '@/lib/api-client';
import { useDebounce } from '@/lib/hooks/use-debounce'; // Assuming we create this or use simple timeout

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
  stock: number;
}

interface Meta {
    total: number;
    page: number;
    lastPage: number;
}

const CATEGORIES = ['Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Beauty'];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Initial load
  const [loadingMore, setLoadingMore] = useState(false); // Scroll load
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useCallback((node: HTMLDivElement) => {
    if (loading || loadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, loadingMore, hasMore]);


  // Reset logic when filters change
  useEffect(() => {
      setPage(1);
      setProducts([]);
      setHasMore(true);
      setLoading(true);
      
      const fetchInitial = async () => {
          try {
              const res = await apiClient.get('/products', { 
                  params: { page: 1, limit: 12, search: debouncedSearch, category: selectedCategory } 
              });
              // Handle response (check if array or paginated object)
              // If backend hasn't deployed new version yet, it returns array. Handle both.
              if (Array.isArray(res.data)) {
                  setProducts(res.data);
                  setHasMore(false); // Old API returns all
              } else {
                  setProducts(res.data.data);
                  setHasMore(res.data.meta.page < res.data.meta.lastPage);
              }
          } catch (e) {
              console.error(e);
          } finally {
              setLoading(false);
          }
      }
      fetchInitial();
  }, [debouncedSearch, selectedCategory]);

  // Load More Logic
  useEffect(() => {
      if (page === 1) return; // Initial load handled above
      
      const fetchMore = async () => {
        setLoadingMore(true);
        try {
            const res = await apiClient.get('/products', { 
                params: { page, limit: 12, search: debouncedSearch, category: selectedCategory } 
            });
            
            if (Array.isArray(res.data)) {
                 // Should not happen if page > 1, but safety fallback
                 setProducts(res.data);
            } else {
                setProducts(prev => [...prev, ...res.data.data]);
                setHasMore(res.data.meta.page < res.data.meta.lastPage);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingMore(false);
        }
      };
      
      fetchMore();
  }, [page]);


  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">All Products</h1>
            <p className="text-gray-600">Explore our collection of premium items</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 space-y-6">
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                <Button 
                    variant={selectedCategory === undefined ? "secondary" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(undefined)}
                >
                  All Categories
                </Button>
                {CATEGORIES.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading && products.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => {
                    // Ref on last element for infinite scroll
                    if (products.length === index + 1) {
                        return (
                            <div ref={lastProductRef} key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        )
                    } else {
                        return <ProductCard key={product.id} product={product} />
                    }
                })}
              </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                    <Button variant="link" onClick={() => {setSearchTerm(''); setSelectedCategory(undefined);}}>Clear filters</Button>
                </div>
            )}
            
            {loadingMore && (
                <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/products/${product.id}`}>
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer flex flex-col group">
            <div className="aspect-square bg-gray-100 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
              {product.image || '📦'}
            </div>
            <CardContent className="p-4 flex-1">
              <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="mb-2">{product.category || 'General'}</Badge>
                  {product.stock <= 5 && product.stock > 0 && (
                      <span className="text-xs text-orange-600 font-medium">Low Stock</span>
                  )}
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{product.name}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
              <span className="text-xl font-bold text-blue-600">${product.price}</span>
              <Button size="sm">Add to Cart</Button>
            </CardFooter>
          </Card>
        </Link>
    )
}
