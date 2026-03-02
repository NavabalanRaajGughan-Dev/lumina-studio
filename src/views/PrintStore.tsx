"use client";

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Check,
  Image as ImageIcon,
  Package,
  Frame,
  BookOpen,
  X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: 'print' | 'canvas' | 'album';
  sizes: { name: string; priceMultiplier: number }[];
  image: string;
}

interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
  finalPrice: number;
}

const products: Product[] = [
  {
    id: 'photo-print',
    name: 'Professional Photo Print',
    description: 'High-quality archival photo prints on premium photographic paper',
    basePrice: 500,
    category: 'print',
    sizes: [
      { name: '4x6"', priceMultiplier: 1 },
      { name: '5x7"', priceMultiplier: 1.5 },
      { name: '8x10"', priceMultiplier: 2.5 },
      { name: '11x14"', priceMultiplier: 4 },
      { name: '16x20"', priceMultiplier: 7 },
      { name: '20x30"', priceMultiplier: 12 },
    ],
    image: '/portfolio/wedding-1.jpg'
  },
  {
    id: 'canvas-print',
    name: 'Canvas Gallery Wrap',
    description: 'Museum-quality canvas prints stretched on wooden frame',
    basePrice: 3500,
    category: 'canvas',
    sizes: [
      { name: '12x16"', priceMultiplier: 1 },
      { name: '16x20"', priceMultiplier: 1.5 },
      { name: '20x24"', priceMultiplier: 2 },
      { name: '24x36"', priceMultiplier: 3.5 },
      { name: '30x40"', priceMultiplier: 5 },
      { name: '40x60"', priceMultiplier: 9 },
    ],
    image: '/portfolio/fashion-1.jpg'
  },
  {
    id: 'framed-print',
    name: 'Framed Print',
    description: 'Elegant framed prints with premium matting and glass',
    basePrice: 4500,
    category: 'print',
    sizes: [
      { name: '8x10"', priceMultiplier: 1 },
      { name: '11x14"', priceMultiplier: 1.5 },
      { name: '16x20"', priceMultiplier: 2.5 },
      { name: '20x24"', priceMultiplier: 3.5 },
      { name: '24x36"', priceMultiplier: 5.5 },
    ],
    image: '/portfolio/portrait-1.jpg'
  },
  {
    id: 'premium-album',
    name: 'Premium Photo Album',
    description: 'Luxury leather-bound album with lay-flat pages',
    basePrice: 15000,
    category: 'album',
    sizes: [
      { name: '8x8" (20 pages)', priceMultiplier: 1 },
      { name: '10x10" (30 pages)', priceMultiplier: 1.5 },
      { name: '12x12" (40 pages)', priceMultiplier: 2 },
      { name: '14x14" (50 pages)', priceMultiplier: 2.8 },
    ],
    image: '/projects/wedding-collection.jpg'
  },
  {
    id: 'layflat-album',
    name: 'Lay-Flat Wedding Album',
    description: 'Seamless lay-flat binding perfect for panoramic shots',
    basePrice: 25000,
    category: 'album',
    sizes: [
      { name: '10x10" (30 pages)', priceMultiplier: 1 },
      { name: '12x12" (40 pages)', priceMultiplier: 1.4 },
      { name: '14x14" (50 pages)', priceMultiplier: 1.9 },
      { name: '16x12" (60 pages)', priceMultiplier: 2.3 },
    ],
    image: '/projects/event-collection.jpg'
  },
  {
    id: 'acrylic-print',
    name: 'Acrylic Wall Art',
    description: 'Vibrant prints face-mounted on crystal clear acrylic',
    basePrice: 8000,
    category: 'canvas',
    sizes: [
      { name: '16x20"', priceMultiplier: 1 },
      { name: '20x30"', priceMultiplier: 1.6 },
      { name: '24x36"', priceMultiplier: 2.2 },
      { name: '30x40"', priceMultiplier: 3 },
      { name: '40x60"', priceMultiplier: 5.5 },
    ],
    image: '/portfolio/commercial-1.jpg'
  },
];

const categoryIcons = {
  print: ImageIcon,
  canvas: Frame,
  album: BookOpen,
};

export function PrintStore() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      const productCards = productsRef.current?.querySelectorAll('.product-card');
      if (productCards) {
        productCards.forEach((card, index) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
              gsap.fromTo(
                card,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: index * 0.1 }
              );
            },
            once: true,
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const addToCart = () => {
    if (selectedProduct && selectedSize) {
      const size = selectedProduct.sizes.find(s => s.name === selectedSize);
      if (size) {
        const finalPrice = Math.round(selectedProduct.basePrice * size.priceMultiplier);
        const existingItem = cart.find(
          item => item.id === selectedProduct.id && item.selectedSize === selectedSize
        );

        if (existingItem) {
          setCart(cart.map(item =>
            item.id === selectedProduct.id && item.selectedSize === selectedSize
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ));
        } else {
          setCart([...cart, {
            ...selectedProduct,
            selectedSize,
            quantity,
            finalPrice
          }]);
        }

        setSelectedProduct(null);
        setSelectedSize('');
        setQuantity(1);
        setShowCart(true);
      }
    }
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(cart.map((item, i) =>
      i === index
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsCheckingOut(false);
    setOrderComplete(true);
    setCart([]);
  };

  return (
    <div className="relative w-full bg-forest-dark min-h-screen pt-32 pb-24">
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-white/50 text-sm font-body uppercase tracking-widest mb-4">
              Print Shop
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight">
              Print <span className="font-serif italic font-normal text-white/80">Store</span>
            </h1>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            <span className="text-white font-body">
              Cart ({cartCount})
            </span>
            {cartTotal > 0 && (
              <span className="text-[#c4a35a] font-sans font-semibold">
                LKR {cartTotal.toLocaleString()}
              </span>
            )}
          </button>
        </div>
        <p className="text-white/60 font-body text-lg max-w-2xl mt-6">
          Transform your digital memories into beautiful physical prints, canvases, and albums.
          Premium quality materials with professional finishing.
        </p>
      </div>

      {/* Products Grid */}
      <div ref={productsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const Icon = categoryIcons[product.category];
            return (
              <div
                key={product.id}
                className="product-card bg-forest-mid/50 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-forest-dark/80 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#c4a35a]" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-sans font-semibold text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-white/50 font-body text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/40 text-xs font-body">Starting from</p>
                      <p className="text-[#c4a35a] font-sans font-semibold">
                        LKR {product.basePrice.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setSelectedSize(product.sizes[0].name);
                        setQuantity(1);
                      }}
                      className="px-5 py-2.5 bg-white/10 text-white text-sm font-body rounded-full hover:bg-[#c4a35a] hover:text-forest-dark transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Selection Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-forest-dark/95 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="bg-forest-mid rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-sans font-semibold text-white">
                  {selectedProduct.name}
                </h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-48 object-cover rounded-xl mb-6"
              />

              <p className="text-white/60 font-body mb-6">
                {selectedProduct.description}
              </p>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block text-white/70 text-sm font-body mb-3">
                  Select Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {selectedProduct.sizes.map((size) => {
                    const price = Math.round(selectedProduct.basePrice * size.priceMultiplier);
                    return (
                      <button
                        key={size.name}
                        onClick={() => setSelectedSize(size.name)}
                        className={`p-3 rounded-lg border transition-all duration-300 ${selectedSize === size.name
                            ? 'border-[#c4a35a] bg-[#c4a35a]/10'
                            : 'border-white/20 hover:border-white/40'
                          }`}
                      >
                        <p className="text-white text-sm font-body">{size.name}</p>
                        <p className="text-[#c4a35a] text-xs font-sans">LKR {price.toLocaleString()}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-white/70 text-sm font-body mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-white font-sans font-semibold text-xl w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <p className="text-white/50 text-sm font-body">Total</p>
                  <p className="text-2xl font-sans font-bold text-[#c4a35a]">
                    LKR {(selectedProduct.sizes.find(s => s.name === selectedSize)?.priceMultiplier || 1) * selectedProduct.basePrice * quantity}
                  </p>
                </div>
                <button
                  onClick={addToCart}
                  className="px-8 py-3 bg-[#c4a35a] text-forest-dark font-sans font-semibold rounded-full hover:bg-[#c4a35a]/90 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-forest-dark border-l border-white/10 overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-sans font-semibold text-white">
                  Your Cart
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50 font-body">Your cart is empty</p>
                </div>
              ) : orderComplete ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-xl font-sans font-semibold text-white mb-2">
                    Order Placed!
                  </h3>
                  <p className="text-white/60 font-body mb-6">
                    Thank you for your order. We'll contact you shortly to confirm the details.
                  </p>
                  <button
                    onClick={() => {
                      setOrderComplete(false);
                      setShowCart(false);
                    }}
                    className="px-6 py-3 bg-white/10 text-white font-body rounded-full hover:bg-white/20 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item, index) => (
                      <div
                        key={index}
                        className="bg-forest-mid/50 rounded-xl p-4 flex gap-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-white font-sans font-semibold text-sm">
                            {item.name}
                          </h4>
                          <p className="text-white/50 text-xs font-body">
                            Size: {item.selectedSize}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(index, -1)}
                              className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-white text-sm font-body w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(index, 1)}
                              className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[#c4a35a] font-sans font-semibold">
                            LKR {(item.finalPrice * item.quantity).toLocaleString()}
                          </p>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="mt-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white/60 font-body">Subtotal</span>
                      <span className="text-white font-sans font-semibold">
                        LKR {cartTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-white/60 font-body">Shipping</span>
                      <span className="text-white/60 font-body">Calculated at checkout</span>
                    </div>
                    <div className="flex items-center justify-between mb-6 pt-4 border-t border-white/10">
                      <span className="text-white font-sans font-semibold">Total</span>
                      <span className="text-2xl text-[#c4a35a] font-sans font-bold">
                        LKR {cartTotal.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="w-full py-4 bg-[#c4a35a] text-forest-dark font-sans font-semibold rounded-full hover:bg-[#c4a35a]/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {isCheckingOut ? (
                        <>
                          <div className="w-5 h-5 border-2 border-forest-dark/30 border-t-forest-dark rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Package className="w-5 h-5" />
                          Proceed to Checkout
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
