Feature: See the friends list

Scenario: The user is not registered in the site and wants to see his friends list
  Given An unregistered user
  When The user registers in the application
  Then The user will access to his friends list
