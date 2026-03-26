import axiosClient from '../api/axiosClient';

const MOCK_PRODUCTS = [
  { id: "1", brand: "Apple", name: "iPhone 15 Pro", basePrice: 1200, imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569" },
  { id: "2", brand: "Samsung", name: "Galaxy S24 Ultra", basePrice: 1350, imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c" },
  { id: "3", brand: "Google", name: "Pixel 8 Pro", basePrice: 1099, imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97" },
  { id: "4", brand: "Nothing", name: "Phone (2)", basePrice: 699, imageUrl: "https://images.unsplash.com/photo-1688647573046-2851cd656093" },
  { id: "5", brand: "Xiaomi", name: "14 Pro", basePrice: 999, imageUrl: "https://images.unsplash.com/photo-1600087626014-e652e18bbff2" },
  { id: "6", brand: "OnePlus", name: "12", basePrice: 850, imageUrl: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7" },
  { id: "7", brand: "Sony", name: "Xperia 1 V", basePrice: 1399, imageUrl: "https://images.unsplash.com/photo-1525598912003-663126343e1f" },
  { id: "8", brand: "Apple", name: "iPhone 14", basePrice: 799, imageUrl: "https://images.unsplash.com/photo-1663465374413-83c907d1eceeb" },
  { id: "9", brand: "Samsung", name: "Galaxy Z Fold 5", basePrice: 1899, imageUrl: "https://images.unsplash.com/photo-1585060544812-6b45742d762f" },
  { id: "10", brand: "Motorola", name: "Edge 50 Pro", basePrice: 899, imageUrl: "https://images.unsplash.com/photo-1580910051074-ce444036cbfe" },
  { id: "11", brand: "Asus", name: "ROG Phone 8 Pro", basePrice: 1199, imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c" },
  { id: "12", brand: "Samsung", name: "Galaxy A54", basePrice: 499, imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c" },
  { id: "13", brand: "Apple", name: "iPhone SE 3", basePrice: 429, imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569" },
  { id: "14", brand: "Google", name: "Pixel 7a", basePrice: 499, imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97" },
  { id: "15", brand: "Huawei", name: "P60 Pro", basePrice: 1199, imageUrl: "https://images.unsplash.com/photo-1600087626014-e652e18bbff2" },
  { id: "16", brand: "Oppo", name: "Find X6 Pro", basePrice: 1050, imageUrl: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7" },
  { id: "17", brand: "Vivo", name: "X100 Pro", basePrice: 950, imageUrl: "https://images.unsplash.com/photo-1688647573046-2851cd656093" },
  { id: "18", brand: "Realme", name: "GT 5 Pro", basePrice: 650, imageUrl: "https://images.unsplash.com/photo-1580910051074-ce444036cbfe" },
  { id: "19", brand: "Honor", name: "Magic 6 Pro", basePrice: 1099, imageUrl: "https://images.unsplash.com/photo-1525598912003-663126343e1f" },
  { id: "20", brand: "Sony", name: "Xperia 5 V", basePrice: 999, imageUrl: "https://images.unsplash.com/photo-1525598912003-663126343e1f" }
];

/**
 * @typedef {Object} ErrorEntity
 * @property {string} error
 * @property {string} message
 */

/**
 * @typedef {Object} ProductListEntity
 * @property {string} id
 * @property {string} brand
 * @property {string} name
 * @property {number} basePrice
 * @property {string} imageUrl
 */

/**
 * @typedef {Object} Specs
 * @property {string} screen
 * @property {string} resolution
 * @property {string} processor
 * @property {string} mainCamera
 * @property {string} selfieCamera
 * @property {string} battery
 * @property {string} os
 * @property {string} screenRefreshRate
 */

/**
 * @typedef {Object} ColorOption
 * @property {string} name
 * @property {string} hexCode
 * @property {string} imageUrl
 */

/**
 * @typedef {Object} StorageOption
 * @property {string} capacity
 * @property {number} price
 */

/**
 * @typedef {Object} ProductEntity
 * @property {string} id
 * @property {string} brand
 * @property {string} name
 * @property {string} description
 * @property {number} basePrice
 * @property {number} rating
 * @property {Specs} specs
 * @property {ColorOption[]} colorOptions
 * @property {StorageOption[]} storageOptions
 * @property {ProductListEntity[]} similarProducts
 */

/**
 * Transforma un error de axios al formato ErrorEntity
 * @param {any} error 
 * @returns {ErrorEntity}
 */
const translateErrorToEntity = (error) => {
  if (error.response && error.response.data) {
    return {
      error: "API_ERROR",
      message: error.response.data.message || 'Error interno de la API.'
    };
  }
  return {
    error: "NETWORK_ERROR",
    message: error.message || 'Error de conexión.'
  };
};

export const phoneService = {
  /**
   * Obtiene la lista de todos los productos.
   * @returns {Promise<ProductListEntity[] | ErrorEntity>}
   */
  getProducts: async () => {
    try {
      const response = await axiosClient.get('/products');
      return response.data;
    } catch (error) {
      console.warn("API falló o no está conectada, usando 20 datos de prueba locales...");
      return new Promise((resolve) => setTimeout(() => resolve(MOCK_PRODUCTS), 600));
    }
  },

  /**
   * Obtiene el producto por ID.
   * @param {string} id 
   * @returns {Promise<ProductEntity | ErrorEntity>}
   */
  getProductById: async (id) => {
    try {
      const response = await axiosClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      return translateErrorToEntity(error);
    }
  },


  addToCart: async ({ id, colorCode, storageCode }) => {
    try {
      const response = await axiosClient.post('/cart', {
        id,
        colorCode,
        storageCode
      });
      return response.data;
    } catch (error) {
      return translateErrorToEntity(error);
    }
  }
};
