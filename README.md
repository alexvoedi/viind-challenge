# @alexvoedi/viind-challenge

## requirements

- [pnpm](https://pnpm.io/)
- [nodejs](https://nodejs.org/en/)

## setup

```bash
pnpm install
```

## run

```bash
pnpm run dev
```

## challenges

### challenge 1

- This challenge is about creating a simple web page that displays the credits of a customer.

### challenge 2

- This challenge is about adding a feature, where besides the monthly credits of a customer, the user can also add additional credits.

### challenge 3

- This challenge is about adding a feature, where the user can use an online service to pay for the additional credits.

- Concept:
  1. Integration the payment service:
      - choose a payment service
      - create an account and integrate the payment functionality into the app and the billing service

  2. Update the user interface:
      - add a button to the user interface that allows the user to buy additional credits
      - the user should be able to choose the amount of credits to buy

  3. Billing logic:
      - add a new endpoint to the billing service that allows the user to buy additional credits
      - the logic should calculate the price of the credits and create a new invoice for the user
      - it should be checked if the user is allowed to buy additional credits

  4. Communicating with the payment service:
      - when the customer submits the payment request, the billing service should communicate with the payment service

  5. Processing the payment:
      - the payment service should process the payment and return a success or error message

  6. Updating the credit balance:
      - if the transaction was successful, the billing service should update the credit balance of the user

  7. Acknowledging the payment:
      - the billing service should send an email to the user to acknowledge the payment

  8. Error handling:
      - if there was and error during the payment process, the billing service should send an email to the user to inform him about the error

  9. Security and privacy:
      - all user data should be transfered securely and encrypted

  10. Refund:
      - there should be a way to refund the payment

  11. Testing and monitoring:
      - there should be extensive testing to make sure that the payment process works as expected
      - there should be monitoring to make sure that the payment process works as expected
