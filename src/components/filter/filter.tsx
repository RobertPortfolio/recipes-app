import { FC } from 'react';

interface FilterProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    setCurrentPage: (page: number) => void;
    categories: string[];
}

const Filter: FC<FilterProps> = ({ selectedCategory, setSelectedCategory, setCurrentPage, categories }) => {
    return (
        <div>
            <select
                className="form-select w-auto"
                value={selectedCategory}
                onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                }}
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;