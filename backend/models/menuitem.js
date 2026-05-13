'use strict';
const { Model } = require('sequelize');

// Self-referential model: top-level nav items (parentId=null) contain sections/links
// We do NOT declare the FK in the column definition to avoid Sequelize alter() issues.
// The parentId relationship is handled at the application level.

module.exports = (sequelize, DataTypes) => {
  class MenuItem extends Model {
    static associate(models) {
      // Self-referential - deliberately no DB-level FK to avoid alter() conflicts
    }
  }

  MenuItem.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // 'nav' | 'section' | 'link'
    itemType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'link'
    },
    // 'mega' | 'sub' | null
    menuType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // e.g. 'NEW', 'FREE'
    badge: {
      type: DataTypes.STRING,
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'MenuItem',
  });

  return MenuItem;
};
