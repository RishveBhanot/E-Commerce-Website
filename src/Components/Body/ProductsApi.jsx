import React from 'react';

export const productsApi = async() => {
    const response = await fetch('https://fakestoreapi.com/products', {
        method: 'GET',
    })

    return await response.json();
}