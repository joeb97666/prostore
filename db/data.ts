// data.ts

import { hashSync } from 'bcrypt-ts-edge';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

// Define interfaces for our data structures
interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  address?: string;
  paymentMethod?: string;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Product {
  id?: string;
  name: string;
  slug: string;
  category: string;
  images: string[];
  brand: string;
  description: string;
  stock: number;
  price: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  banner: string | null;
  createdAt?: Date;
}

// Interface for CSV product record
interface ProductCSV {
  id?: string;
  name: string;
  slug: string;
  category: string;
  images: string;
  brand: string;
  description: string;
  stock: string;
  price: string;
  rating: string;
  numReviews: string;
  isFeatured: string;
  banner?: string;
  createdAt?: string;
}

// Interface for CSV user record
interface UserCSV {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  address?: string;
  paymentMethod?: string;
  emailVerified?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Original sample data
const dbData: { users: User[]; products: Product[] } = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: hashSync('123456', 10),
      role: 'admin',
    },
    {
      name: 'user',
      email: 'user@example.com',
      password: hashSync('123456', 10),
      role: 'user',
    }
  ],

  products: [
    
  ],
};

// Function to load CSV data
export function loadCsvData(): { products: Product[]; users: User[] } {
  try {
    // Load and parse Products CSV
    const productsCsvPath = './Product.csv';
    let productsFormatted: Product[] = [];
    
    if (fs.existsSync(productsCsvPath)) {
      const productsCsvContent = fs.readFileSync(productsCsvPath, 'utf8');
      const productsFromCsv = parse(productsCsvContent, {
        columns: true,
        skip_empty_lines: true
      }) as ProductCSV[];

      // Transform CSV product data to match schema
      productsFormatted = productsFromCsv.map((product: ProductCSV): Product => ({
        // If ID is provided, use it for exact matching during upsert
        ...(product.id ? { id: product.id } : {}),
        name: product.name,
        slug: product.slug,
        category: product.category,
        images: product.images.split(','),
        brand: product.brand,
        description: product.description,
        stock: parseInt(product.stock),
        price: parseFloat(product.price),
        rating: parseFloat(product.rating),
        numReviews: parseInt(product.numReviews),
        isFeatured: product.isFeatured === "true",
        banner: product.banner === "" ? null : product.banner || null,
        ...(product.createdAt ? { createdAt: new Date(product.createdAt) } : {})
      }));
    }

    // Load and parse Users CSV
    const usersCsvPath = './User.csv';
    let usersFormatted: User[] = [];
    
    if (fs.existsSync(usersCsvPath)) {
      const usersCsvContent = fs.readFileSync(usersCsvPath, 'utf8');
      const usersFromCsv = parse(usersCsvContent, {
        columns: true,
        skip_empty_lines: true
      }) as UserCSV[];

      // Transform CSV user data to match schema
      usersFormatted = usersFromCsv.map((user: UserCSV): User => ({
        ...(user.id ? { id: user.id } : {}),
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        ...(user.address ? { address: user.address } : {}),
        ...(user.paymentMethod ? { paymentMethod: user.paymentMethod } : {}),
        emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
        image: user.image || null,
        ...(user.createdAt ? { createdAt: new Date(user.createdAt) } : {}),
        ...(user.updatedAt ? { updatedAt: new Date(user.updatedAt) } : {})
      }));
    }

    return {
      products: productsFormatted,
      users: usersFormatted
    };
  } catch (error) {
    console.error('Error loading CSV data:', error);
    return { products: [], users: [] };
  }
}

export default dbData;