Feature: Wishlist API

    Scenario: Get response 200 with empty list wishlist
        When I request "GET" "/api/wishlists"
        Then I should receive an empty array
        And the response code should be 200
        And I should receive an array with 0 elements

    Scenario: Create an wishlist
        Given I have a payload
            | name  | "wishlist1" |
        When I request "POST" "/api/wishlists" with payload
        And the response code should be 200
        And I should receive an element with the following attributes
            | name | "wishlist1" |
     Scenario: Not create an wishlist with missing properties
        Given I have a payload
            | nadme  | "wishlist1" |
        When I request "POST" "/api/wishlists" with payload
        And the response code should be 500

    # Scenario: Update an wishlist
    #     Given I have a wishlist
    #         | _id   | 1       |
    #         | name  | "wishlist1" |
    #         | price | 100     |
    #     When I request "PUT" "/api/wishlists/1" with payload
    #     And the response code should be 201
    #     And I should receive an element with the following attributes
    #         | name | "wishlist1" |


# Scenario: Get an wishlist
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