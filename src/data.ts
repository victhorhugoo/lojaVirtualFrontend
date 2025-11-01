export const data = {
    banners: [
        {img: '/assets/banners/banner-1.png', link: ''},
        {img: '/assets/banners/banner-2.png', link: ''},
        {img: '/assets/banners/banner-3.png', link: ''},
        {img: '/assets/banners/banner-4.png', link: ''},
    ],
    products: [
        { id: 1, label: 'Camisa PHP', price: 59.99, image: '/assets/products/camiseta-php.png', liked: false},
        { id: 2, label: 'Camisa Laravel', price: 23.87, image: '/assets/products/camiseta-laravel-branca.png', liked: false},
        { id: 3, label: 'Camisa Node', price: 39.99, image: '/assets/products/camiseta-node.png', liked: false},
        { id: 4, label: 'Camisa React', price: 79.99, image: '/assets/products/camiseta-react-azul.png', liked: false},
    ],
    product: {
        id: 1,
        label: 'Camisa PHP',
        images: [
            '/assets/products/camiseta-php.png',
            '/assets/products/camiseta-node.png',
        ],
        price: 19.90,
        liked: false,
        description: 'Melhor agora do que antes'
    }
}