Feature: Item API

    Scenario: Get response 200 with empty list item
        When I request "GET" "/api/items"
        Then I should receive an empty array
        And the response code should be 200
        And I should receive an array with 0 elements


    Scenario: Create an item
        Given I have a payload
            | name  | "item1" |
            | price | 100     |
        When I request "POST" "/api/items" with payload
        And the response code should be 201
        And I should receive an element with the following attributes
            | name | "item1" |

    Scenario: Update an item
        Given I have a item
            | _id   | 1       |
            | name  | "item1" |
            | price | 100     |
        When I request "PUT" "/api/items/1" with payload
        And the response code should be 201
        And I should receive an element with the following attributes
            | name | "item1" |
    Scenario: Get code 404 when try to PUT item
        Given I have no item
        When I request "PUT" "/api/items" with payload
        And the response code should be 201
        And I should receive an element with the following attributes
            | name | "item1" |


# Scenario: Get an item
#     Given I load fixtures "product.json"
#     When I request "GET" "/products/{{knife2.id}}"
#     Then I should receive an element with the following attributes
#         | name | {{knife1.name}} |

# Scenario: Update a product
#     Given I load fixtures "user.json,product.json"
#     And I am authenticated as "admin"
#     And I have a payload
#         | name | "Product 2" |
#     When I request "PUT" "/products/{{knife2.id}}"
#     And the response code should be 200
#     Then I should receive an element with the following attributes
#         | name | "Product 2" |