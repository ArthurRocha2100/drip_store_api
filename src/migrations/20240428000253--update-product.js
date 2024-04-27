'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('products');
    if (!table.categoryId)
      return queryInterface.addColumn(
        'products',
        'categoryId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'categories',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        }
      );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('products', 'categoryId');
  },
};
