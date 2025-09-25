"use client";
import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
}

export default function SearchBar({ 

  placeholder = "Search for jobs, talent, or skills...",
  defaultValue = ""
}: SearchBarProps) {

    const onSearch = (query: string) => {
        // Handle search logic - could redirect with query params
        window.location.href = `?search=${encodeURIComponent(query)}`;
      };
  const [searchQuery, setSearchQuery] = useState(defaultValue);

  const handleSubmit = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="w-[320px] md:w-[550px] 2xl:w-[748px] max-w-4xl mx-auto mb-6">
      <div className="relative flex items-center">
        <Search 
          className="absolute left-4 text-gray-400 z-10" 
          size={20}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-[30px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 bg-white shadow-sm"
        />
      </div>
    </div>
  );
}