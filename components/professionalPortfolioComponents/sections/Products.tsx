import { SafeImage } from "@/app/utils/SafeImage";
import { Product } from "@/lib/types";
import { convertDriveToImageUrl } from "@/lib/utils";
import { ShoppingCart, Tag, PackageCheck, PackageX } from "lucide-react";

interface ProductsProps {
  products: Product[];
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card overflow-hidden flex flex-col h-full group">
      {product.image && (
        <div
          className="relative overflow-hidden"
          style={{ paddingBottom: "65%" }}
        >
          {product.image && convertDriveToImageUrl(product.image) ? (
            <SafeImage
              height={200}
              width={200}
              src={convertDriveToImageUrl(product.image) ?? ""}
              alt={product.title}
              className="w-12 h-12 rounded-full object-cover mb-2"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          )}
          {product.badge && (
            <div className="absolute top-3 left-3 badge">{product.badge}</div>
          )}
          {product.inStock === false && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-sm font-bold">Out of Stock</span>
            </div>
          )}
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        {product.category && (
          <div
            className="text-xs font-medium mb-1"
            style={{ color: "var(--accent)" }}
          >
            {product.category}
          </div>
        )}
        <h3
          className="font-bold text-base mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {product.title}
        </h3>
        <p
          className="text-sm leading-relaxed flex-1 mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {product.description}
        </p>
        <div
          className="flex items-center justify-between mt-auto pt-3 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          {product.price ? (
            <div className="flex items-center gap-1.5">
              <Tag size={13} style={{ color: "var(--accent)" }} />
              <span className="font-bold" style={{ color: "var(--accent)" }}>
                {product.price}
              </span>
            </div>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-1.5">
            {product.inStock !== false ? (
              <PackageCheck size={13} className="text-emerald-500" />
            ) : (
              <PackageX size={13} className="text-red-400" />
            )}
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {product.inStock !== false ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Products({ products }: ProductsProps) {
  if (!products.length) return null;

  return (
    <section
      id="products"
      className="section"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-label">Products</div>
          <h2 className="section-title">
            Our <span className="gradient-text">Products</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
