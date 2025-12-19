import Link from 'next/link';
import { ArrowRight, ShoppingBag, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      image: '🎧',
      badge: 'Bestseller',
      category: 'Electronics',
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      price: 399.99,
      image: '⌚',
      badge: 'New',
      category: 'Wearables',
    },
    {
      id: 3,
      name: 'Designer Backpack',
      price: 89.99,
      image: '🎒',
      badge: 'Sale',
      category: 'Fashion',
    },
    {
      id: 4,
      name: 'Portable Speaker',
      price: 149.99,
      image: '🔊',
      badge: 'Hot',
      category: 'Audio',
    },
  ];

  const categories = [
    { name: 'Electronics', icon: '💻', count: 234 },
    { name: 'Fashion', icon: '👔', count: 567 },
    { name: 'Home & Garden', icon: '🏡', count: 189 },
    { name: 'Sports', icon: '⚽', count: 345 },
    { name: 'Books', icon: '📚', count: 678 },
    { name: 'Toys', icon: '🎮', count: 123 },
  ];

  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Free Shipping',
      description: 'On orders over $50',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Payment',
      description: '100% secure transactions',
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: '24/7 Support',
      description: 'Dedicated customer service',
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: 'Easy Returns',
      description: '30-day return policy',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-blue-600">New Collection 2025</Badge>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Discover Your
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Perfect Style
                  </span>
                </h1>
                <p className="text-lg text-gray-600 max-w-md">
                  Shop the latest trends with exclusive deals. Quality products, unbeatable prices, delivered to your door.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/products">
                    <Button size="lg" className="w-full sm:w-auto">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/deals">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      View Deals
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="text-9xl text-center animate-bounce">
                  🛍️
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-white border-y">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg text-blue-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
              <p className="text-gray-600">Browse our wide selection of products</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <Link key={index} href={`/categories/${category.name.toLowerCase()}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                        {category.icon}
                      </div>
                      <h3 className="font-semibold mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.count} items</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
                <p className="text-gray-600">Handpicked items just for you</p>
              </div>
              <Link href="/products">
                <Button variant="outline">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-8xl group-hover:scale-105 transition-transform">
                        {product.image}
                      </div>
                      <Badge className="absolute top-3 right-3 bg-blue-600">
                        {product.badge}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                      <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-600">
                          ${product.price}
                        </span>
                        <Button size="sm" variant="ghost">
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover amazing products at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white hover:text-blue-600">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
