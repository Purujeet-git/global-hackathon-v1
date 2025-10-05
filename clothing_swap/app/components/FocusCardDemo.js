'use client';

import { FocusCards } from "./ui/Card";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export function FocusCardsDemo() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    // ✨ 1. Create a new state to hold the cards data
    const [cards, setCards] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                setProduct(data.product);

                // ✨ 2. Transform the fetched images into the format the FocusCards component needs
                if (data.product.images && data.product.images.length > 0) {
                    const formattedCards = data.product.images.map((imageUrl, index) => ({
                        // Create a dynamic title for each card
                        title: `${data.product.name} - Image ${index + 1}`,
                        // Use the image URL from your database as the source
                        src: imageUrl,
                    }));
                    
                    // ✨ 3. Update the cards state with the newly formatted array
                    setCards(formattedCards);
                }

            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProduct();
    }, [id]);

    // ✨ 4. Add a loading state to prevent errors before data is ready
    if (loading) {
        return <p className="text-center text-xl mt-10">Loading Cards...</p>;
    }

    return <FocusCards cards={cards} />;
}