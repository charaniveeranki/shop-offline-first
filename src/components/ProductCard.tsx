import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onAddToCart: (product: { id: number; name: string; price: number; image: string }) => void;
}

export const ProductCard = ({ id, name, price, image, onAddToCart }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="group overflow-hidden border-border transition-all duration-300 hover:shadow-[var(--shadow-hover)]">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-accent">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 bg-card/80 backdrop-blur-sm transition-all hover:bg-card"
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isFavorite ? "fill-secondary text-secondary" : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>
        <div className="space-y-3 p-4">
          <div>
            <h3 className="font-semibold text-foreground line-clamp-1">{name}</h3>
            <p className="mt-1 text-2xl font-bold text-primary">${price}</p>
          </div>
          <Button
            onClick={() => onAddToCart({ id, name, price, image })}
            className="w-full transition-all"
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
