const axios = require('axios');

async function getAllProducts() {
    const response = await axios.get("https://dummyjson.com/products");


    const normalizedProducts = response.data.products.map((product) => ({
        id: product.id,
        nome: product.title,
        descricao: product.description,
        preco: product.price,
        estoque: product.stock,
        imagem: product.thumbnail
    })) 


    return normalizedProducts;
}

module.exports = {
    getAllProducts
}