'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
    await queryInterface.addConstraint('Tasks', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fkey_user_to_tasks',
      references: { 
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('Tasks', {
        fields: ['OrganizationId'],
        type: 'foreign key',
        name: 'fkey_organization_to_tasks',
        references: { 
          table: 'Organizations',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    })
    await queryInterface.addConstraint('UserOrganizations', {
        fields: ['OrganizationId'],
        type: 'foreign key',
        name: 'fkey_project_to_userorganization',
        references: { 
          table: 'Organizations',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    })
    await queryInterface.addConstraint('UserOrganizations', {
        fields: ['UserId'],
        type: 'foreign key',
        name: 'fkey_user_to_userorganization',
        references: { 
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    })
    } catch(err) {
      console.log(err)
    }
  },


  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
   await queryInterface
   .removeConstraint('Tasks','fkey_user_to_tasks')
   await queryInterface
     .removeConstraint('Tasks','fkey_organization_to_tasks')
   await queryInterface
     .removeConstraint('UserProjects','fkey_organization_to_userorganization')
   await queryInterface
     .removeConstraint('UserProjects','fkey_user_to_userorganization')
  }
};
