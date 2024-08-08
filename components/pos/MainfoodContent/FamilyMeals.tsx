import React, { useEffect, useState } from 'react';

interface Food {
    name: string;
    price: number;
}

interface UnliProps {
    onFoodSelect: (food: Food) => void;
}

const FamilyMeals: React.FC<UnliProps> = ({ onFoodSelect }) => {
    const [foodItems, setFoodItems] = useState<Food[]>([]);

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await fetch('/api/foods?category=FamilyMeals');
                const data = await response.json();
                setFoodItems(data);
            } catch (error) {
                console.error('Error fetching food items:', error);
            }
        };

        fetchFoodItems();
    }, []);

    // Helper function to split items into rows of 4
    const splitIntoRows = (items: Food[], itemsPerRow: number): Food[][] => {
        const rows: Food[][] = [];
        for (let i = 0; i < items.length; i += itemsPerRow) {
            rows.push(items.slice(i, i + itemsPerRow));
        }
        return rows;
    };

    const rows = splitIntoRows(foodItems, 3);

    return (
        <div>
            {foodItems.length === 0 ? (
                <p>Loading...</p>
            ) : (
                rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-1">
                        {row.map((food, index) => (
                            <button
                                key={index}
                                className="mb-1 py-5 px-10 rounded-2xl bg-white text-black"
                                onClick={() => onFoodSelect(food)}
                            >
                                {food.name}
                            </button>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default FamilyMeals;
