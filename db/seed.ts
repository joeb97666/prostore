
import { PrismaClient } from "@prisma/client";
import dbData from "./data";
import { loadCsvData } from "./data";

async function main() {
    const prisma = new PrismaClient();
    
    try {
        // Load data from CSV files
        const csvData = loadCsvData();
        
        // Process CSV products using upsert
        if (csvData.products && csvData.products.length > 0) {
            console.log(`Processing ${csvData.products.length} products from CSV...`);
            
            for (const product of csvData.products) {
                await prisma.product.upsert({
                    where: { 
                        // If we have an ID, use it as the primary key for matching
                        ...(product.id ? { id: product.id } : { slug: product.slug })
                    },
                    update: {
                        name: product.name,
                        category: product.category,
                        images: product.images,
                        brand: product.brand,
                        description: product.description,
                        stock: product.stock,
                        price: product.price,
                        rating: product.rating,
                        numReviews: product.numReviews,
                        isFeatured: product.isFeatured,
                        banner: product.banner
                    },
                    create: product
                });
            }
            console.log(`Successfully processed products from CSV`);
        } else {
            // Fallback to using sample data if no CSV data is available
            console.log("No CSV product data found, using sample data for development");
            
            for (const product of dbData.products) {
                await prisma.product.upsert({
                    where: { slug: product.slug },
                    update: {
                        name: product.name,
                        category: product.category,
                        images: product.images,
                        brand: product.brand,
                        description: product.description,
                        stock: product.stock,
                        price: product.price,
                        rating: product.rating,
                        numReviews: product.numReviews,
                        isFeatured: product.isFeatured,
                        banner: product.banner
                    },
                    create: product
                });
            }
        }
        
        // Process CSV users using upsert
        if (csvData.users && csvData.users.length > 0) {
            console.log(`Processing ${csvData.users.length} users from CSV...`);
            
            for (const user of csvData.users) {
                await prisma.user.upsert({
                    where: { 
                        // If we have an ID, use it as the primary key for matching
                        ...(user.id ? { id: user.id } : { email: user.email }) 
                    },
                    update: {
                        name: user.name,
                        role: user.role,
                        // Don't update password if it might be a hashed value already
                        ...(user.address ? { address: user.address } : {}),
                        ...(user.paymentMethod ? { paymentMethod: user.paymentMethod } : {}),
                        ...(user.image ? { image: user.image } : {})
                    },
                    create: user
                });
            }
            console.log(`Successfully processed users from CSV`);
        } else {
            // Fallback to using sample data if no CSV data is available
            console.log("No CSV user data found, using sample data for development");
            
            for (const user of dbData.users) {
                await prisma.user.upsert({
                    where: { email: user.email },
                    update: {
                        name: user.name,
                        role: user.role
                    },
                    create: user
                });
            }
        }

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });