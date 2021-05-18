#  Need initial test data from Rails Migration: https://bitbucket.org/ascendcorp/acm-trg
  # These scenario should be rewrite after token based Authorization is implemented

Feature: Authentication failed

  Background: Mock
    Given all API end-point mocked

  @api_test @service
  Scenario: 00016 Create Service failed - Invalid Username
    When request to create TRG Service with "00016" payload
    Then response failed with status code "401" and response code "1001"
    And response error description is "Authentication fail"
