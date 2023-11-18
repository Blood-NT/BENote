'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');


module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            uid: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            fullname: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
            token: {
                type: DataTypes.STRING,
            },
            tokennn: {
                type: DataTypes.STRING,
            },

        });
        await queryInterface.createTable('notes', {
            nid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uid: {
                type: DataTypes.STRING,
            },
            title: {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.STRING,
            },
            share: {
                type: DataTypes.STRING,
            },
            importance: {
                type: DataTypes.STRING,
            },
            color: {
                type: DataTypes.STRING,
            },
            created: {
                type: DataTypes.STRING,
            },
        })
        await queryInterface.createTable('contents', {
            cid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nid: {
                type: DataTypes.INTEGER,
            },
            uid: {
                type: DataTypes.STRING,
            },
            content: {
                type: DataTypes.STRING,
            },
            updateat: {
                type: DataTypes.STRING,
            },
        });


        await queryInterface.createTable('save', {
            hid: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            gid: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            noteid: {
                type: DataTypes.INTEGER,
            },
            statusbar: {
                type: DataTypes.STRING,
            },
        });
        await queryInterface.createTable("token",
            {
                id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
                email: DataTypes.STRING(50),
                uniqueString: DataTypes.STRING(50),
                createAt: DataTypes.DATE,
                effectiveSeconds: DataTypes.INTEGER,
            });
        await queryInterface.createTable(
            "fogotPassword",

            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                email: {
                    type: DataTypes.STRING,
                },
                uniqueString: {
                    type: DataTypes.STRING,
                },
                createAt: {
                    type: DataTypes.DATE,
                },
                effectiveSeconds: {
                    type: DataTypes.INTEGER,
                },
                password: {
                    type: DataTypes.STRING,
                },
            });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    },
};