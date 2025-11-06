import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ShoppingCartSheet } from "@/components/ShoppingCartSheet";
import { NotificationPrompt } from "@/components/NotificationPrompt";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-banner.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const products = [
  { id: 1, name: "Premium Wireless Headphones", price: 299, image: product1 },
  { id: 2, name: "Smart Watch Pro", price: 449, image: product2 },
  { id: 3, name: "Designer Sunglasses", price: 189, image: product3 },
  { id: 4, name: "Leather Backpack", price: 159, image: product4 },
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">ShopNow</h1>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingCartSheet
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden bg-[var(--gradient-hero)] md:h-[500px]">
        <img
          src={heroImage}
          alt="Premium products showcase"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-background/80 to-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                Premium Products, Anytime
              </h2>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Shop offline-ready. Get notified instantly.
              </p>
              <Button size="lg" className="mt-6">
                Explore Collection
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8 flex items-center gap-2">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
          </div>
        </div>

        {/* Products Grid */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">Featured Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No products found matching "{searchQuery}"
            </p>
          )}
        </section>

        {/* PWA Features Info */}
        <section className="mt-16 rounded-lg border border-border bg-accent p-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Why Shop With Us?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-2 font-semibold text-primary">📱 Install & Go</h3>
              <p className="text-sm text-muted-foreground">
                Add to your home screen for app-like experience
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-primary">🔔 Stay Updated</h3>
              <p className="text-sm text-muted-foreground">
                Get instant notifications on new arrivals and offers
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-primary">📶 Works Offline</h3>
              <p className="text-sm text-muted-foreground">
                Browse products even without internet connection
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-muted py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 ShopNow. Premium e-commerce PWA.</p>
        </div>
      </footer>

      <NotificationPrompt />
    </div>
  );
};

export default Index;
