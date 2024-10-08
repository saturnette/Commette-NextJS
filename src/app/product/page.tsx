'use client';

import { useState, useEffect } from 'react';
import { useProtectRoute } from '@/utils/protectedRoute'; 
import ProductList from '@/component/ProductList';
import NavBar from '@/component/Navbar';
import { GetProducts } from '@/services/products'; 

export default function ProductsPage() {
  const [products, setProducts] = useState<{ 
     ProductID: number;
      ProductName: string; 
      BrandName: string; 
      CategoryName: string; 
      Price: number; 
      QuantityAvailable: number; 
      SellerCompany: string; 
      ProductDescription: string; 
  }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useProtectRoute('/login');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await GetProducts();
        setProducts(productData);
        console.log(productData);
      } catch (err) {
        setError('Failed to fetch products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <NavBar />
      <ProductList products={products} isMy={false}/>
    </>
  );
}
