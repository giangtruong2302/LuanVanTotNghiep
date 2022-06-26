"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Staffs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      StaffId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      StaffName: {
        type: Sequelize.STRING,
      },
      StaffImage: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      StaffPhoneNumber: {
        type: Sequelize.STRING,
      },
      Gender: {
        type: Sequelize.BOOLEAN,
      },
      DayOfBirth: {
        type: Sequelize.STRING,
      },
      Address: {
        type: Sequelize.STRING,
      },
      RoleId: {
        type: Sequelize.INTEGER,
      },
      StaffEmail: {
        type: Sequelize.STRING,
      },
      CenterId: {
        type: Sequelize.INTEGER,
      },
      SalaryId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Staffs");
  },
};
