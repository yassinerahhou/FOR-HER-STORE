import { products } from '@/lib/products';
import ProductPage from './product-page-client';

export function generateStaticParams() {
  return products.map(({ id }) => ({ id }));
}

export default async function ProductRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductPage id={id} />;
}
