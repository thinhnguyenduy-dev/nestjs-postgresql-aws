'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import apiClient from '@/lib/api-client';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
  stock: number;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const resolvedParams = use(params);

  useEffect(() => {
    fetchProduct();
  }, [resolvedParams.id]);

  const fetchProduct = async () => {
    try {
      const response = await apiClient.get(`/products/${resolvedParams.id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading product details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
                <Link href="/products">
                    <Button>Back to Products</Button>
                </Link>
            </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Link href="/products" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center text-9xl">
            {product.image || '📦'}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="text-sm">{product.category || 'General'}</Badge>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                        <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-600">
                        <Share2 className="h-5 w-5" />
                    </Button>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current text-gray-300" />
                </div>
                <span className="text-sm text-gray-500">(24 reviews)</span>
              </div>
              <p className="text-3xl font-bold text-blue-600">${product.price}</p>
            </div>

            <Separator />

            <div className="prose max-w-none text-gray-600">
              <p>{product.description}</p>
            </div>

            <Separator />

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <span className="font-medium">Quantity:</span>
                    <div className="flex items-center border rounded-md">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                            -
                        </Button>
                        <span className="w-12 text-center">{quantity}</span>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9"
                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        >
                            +
                        </Button>
                    </div>
                    <span className="text-sm text-gray-500">{product.stock} items available</span>
                </div>

                <div className="flex gap-4 pt-4">
                    <Button size="lg" className="flex-1 text-lg h-12">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                    </Button>
                    <Button size="lg" variant="secondary" className="flex-1 text-lg h-12">
                        Buy Now
                    </Button>
                </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <h4 className="font-semibold text-blue-800 mb-2">Why Shop With Us?</h4>
                <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
                    <li>Free shipping on orders over $50</li>
                    <li>Secure payment processing</li>
                    <li>30-day money-back guarantee</li>
                </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
