import React, { useState, useEffect } from 'react';
import './NewCollections.css';  // Update the path if necessary
import Item from '../Item/Item';  // Update the path if necessary

const NewCollections = () => {
  const [new_collections, setNewCollections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/products/getAll');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const processedData = data.map(product => ({
          id: product.id,
          name: product.name,
          // Construct the image path based on the product id
          image: require(`../Assets/product_${product.photoURL}.png`),
          new_price: product.price,
        }));

        setNewCollections(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);  // Empty dependency array ensures the effect runs only once

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {/* Use slice to display only the first 4 items */}
        {new_collections.slice(0, 4).map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
