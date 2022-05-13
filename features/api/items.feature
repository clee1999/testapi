Feature: Product API

    Scenario: Get response 200 with empty list itemd
        When I request "GET" "/api/items"
        Then I should receive an empty array
        And the response code should be 200
        And I should receive an array with 0 elements


    Scenario: Create an item
        Given I have a payload
            | name  | "Product 1"   |
            | price | 100    length |
        When I request "POST" "/api/items" with payload
        And the response code should be 201
        And I should receive an element with the following attributes
            | name | "Product 1" |

Scenario: Get a item
    Given I load fixtures "items.json"
    When I request "GET" "api/items/{{knife2.id}}"
    Then I should receive an element with the following attributes
        | name | {{knife1.name}} |

# Scenario: Update a product
#     Given I load fixtures "user.json,product.json"
#     And I am authenticated as "admin"
#     And I have a payload
#         | name | "Product 2" |
#     When I request "PUT" "/products/{{knife2.id}}"
#     And the response code should be 200
#     Then I should receive an element with the following attributes
#         | name | "Product 2" |