import axiosClient from '../api/axiosClient';

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
      error: 'API_ERROR',
      message: error.response.data.message || 'Error interno de la API.',
    };
  }
  return {
    error: 'NETWORK_ERROR',
    message: error.message || 'Error de conexión.',
  };
};

export const phoneService = {
  /**
   * Obtiene la lista de todos los productos de la API (Limitado a 20).
   */
  getProducts: async () => {
    try {
      const response = await axiosClient.get('/products', {
        params: { limit: 20 },
      });
      return response.data;
    } catch (error) {
      throw translateErrorToEntity(error);
    }
  },

  /**
   * Busca productos por nombre o marca usando filtrado por API (Limitado a 20).
   */
  searchProducts: async (query) => {
    try {
      const response = await axiosClient.get('/products', {
        params: {
          search: query,
          limit: 20,
        },
      });
      return response.data;
    } catch (error) {
      throw translateErrorToEntity(error);
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

  /**
   * Añade un producto al carrito.
   */
  addToCart: async ({ id, colorCode, storageCode }) => {
    try {
      const response = await axiosClient.post('/cart', {
        id,
        colorCode,
        storageCode,
      });
      return response.data;
    } catch (error) {
      return translateErrorToEntity(error);
    }
  },
};
