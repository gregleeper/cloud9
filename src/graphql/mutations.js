/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
      id
      name
      description
      price
      categoryId
      createdAt
      updatedAt
      category {
        id
        name
        createdAt
        updatedAt
        items {
          nextToken
        }
      }
      orders {
        items {
          id
          itemId
          orderId
          quantity
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
      id
      name
      description
      price
      categoryId
      createdAt
      updatedAt
      category {
        id
        name
        createdAt
        updatedAt
        items {
          nextToken
        }
      }
      orders {
        items {
          id
          itemId
          orderId
          quantity
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
      id
      name
      description
      price
      categoryId
      createdAt
      updatedAt
      category {
        id
        name
        createdAt
        updatedAt
        items {
          nextToken
        }
      }
      orders {
        items {
          id
          itemId
          orderId
          quantity
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      items {
        items {
          id
          name
          description
          price
          categoryId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      items {
        items {
          id
          name
          description
          price
          categoryId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      items {
        items {
          id
          name
          description
          price
          categoryId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createAddIn = /* GraphQL */ `
  mutation CreateAddIn(
    $input: CreateAddInInput!
    $condition: ModelAddInConditionInput
  ) {
    createAddIn(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      category {
        id
        name
        createdAt
        updatedAt
        items {
          nextToken
        }
      }
      orderItems {
        items {
          id
          orderItemId
          addInId
          quantity
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateAddIn = /* GraphQL */ `
  mutation UpdateAddIn(
    $input: UpdateAddInInput!
    $condition: ModelAddInConditionInput
  ) {
    updateAddIn(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      category {
        id
        name
        createdAt
        updatedAt
        items {
          nextToken
        }
      }
      orderItems {
        items {
          id
          orderItemId
          addInId
          quantity
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteAddIn = /* GraphQL */ `
  mutation DeleteAddIn(
    $input: DeleteAddInInput!
    $condition: ModelAddInConditionInput
  ) {
    deleteAddIn(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      category {
        id
        name
        createdAt
        updatedAt
        items {
          nextToken
        }
      }
      orderItems {
        items {
          id
          orderItemId
          addInId
          quantity
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
      id
      customerEmail
      username
      createdAt
      updatedAt
      orders {
        items {
          id
          customerEmail
          status
          createdAt
          total
          deliveryPeriod
          deliveryLocation
          changeRequired
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
      id
      customerEmail
      username
      createdAt
      updatedAt
      orders {
        items {
          id
          customerEmail
          status
          createdAt
          total
          deliveryPeriod
          deliveryLocation
          changeRequired
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
      id
      customerEmail
      username
      createdAt
      updatedAt
      orders {
        items {
          id
          customerEmail
          status
          createdAt
          total
          deliveryPeriod
          deliveryLocation
          changeRequired
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      customerEmail
      status
      createdAt
      total
      deliveryPeriod
      deliveryLocation
      changeRequired
      updatedAt
      items {
        items {
          id
          itemId
          orderId
          quantity
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      customerEmail
      status
      createdAt
      total
      deliveryPeriod
      deliveryLocation
      changeRequired
      updatedAt
      items {
        items {
          id
          itemId
          orderId
          quantity
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      customerEmail
      status
      createdAt
      total
      deliveryPeriod
      deliveryLocation
      changeRequired
      updatedAt
      items {
        items {
          id
          itemId
          orderId
          quantity
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createOrderItemAddIn = /* GraphQL */ `
  mutation CreateOrderItemAddIn(
    $input: CreateOrderItemAddInInput!
    $condition: ModelOrderItemAddInConditionInput
  ) {
    createOrderItemAddIn(input: $input, condition: $condition) {
      id
      orderItemId
      addInId
      quantity
      createdAt
      updatedAt
      addIn {
        id
        name
        description
        createdAt
        updatedAt
        category {
          id
          name
          createdAt
          updatedAt
        }
        orderItems {
          nextToken
        }
      }
      orderItem {
        id
        itemId
        orderId
        quantity
        createdAt
        updatedAt
        item {
          id
          name
          description
          price
          categoryId
          createdAt
          updatedAt
        }
        order {
          id
          customerEmail
          status
          createdAt
          total
          deliveryPeriod
          deliveryLocation
          changeRequired
          updatedAt
        }
        addIns {
          nextToken
        }
      }
    }
  }
`;
export const updateOrderItemAddIn = /* GraphQL */ `
  mutation UpdateOrderItemAddIn(
    $input: UpdateOrderItemAddInInput!
    $condition: ModelOrderItemAddInConditionInput
  ) {
    updateOrderItemAddIn(input: $input, condition: $condition) {
      id
      orderItemId
      addInId
      quantity
      createdAt
      updatedAt
      addIn {
        id
        name
        description
        createdAt
        updatedAt
        category {
          id
          name
          createdAt
          updatedAt
        }
        orderItems {
          nextToken
        }
      }
      orderItem {
        id
        itemId
        orderId
        quantity
        createdAt
        updatedAt
        item {
          id
          name
          description
          price
          categoryId
          createdAt
          updatedAt
        }
        order {
          id
          customerEmail
          status
          createdAt
          total
          deliveryPeriod
          deliveryLocation
          changeRequired
          updatedAt
        }
        addIns {
          nextToken
        }
      }
    }
  }
`;
export const deleteOrderItemAddIn = /* GraphQL */ `
  mutation DeleteOrderItemAddIn(
    $input: DeleteOrderItemAddInInput!
    $condition: ModelOrderItemAddInConditionInput
  ) {
    deleteOrderItemAddIn(input: $input, condition: $condition) {
      id
      orderItemId
      addInId
      quantity
      createdAt
      updatedAt
      addIn {
        id
        name
        description
        createdAt
        updatedAt
        category {
          id
          name
          createdAt
          updatedAt
        }
        orderItems {
          nextToken
        }
      }
      orderItem {
        id
        itemId
        orderId
        quantity
        createdAt
        updatedAt
        item {
          id
          name
          description
          price
          categoryId
          createdAt
          updatedAt
        }
        order {
          id
          customerEmail
          status
          createdAt
          total
          deliveryPeriod
          deliveryLocation
          changeRequired
          updatedAt
        }
        addIns {
          nextToken
        }
      }
    }
  }
`;
export const createOrderItem = /* GraphQL */ `
  mutation CreateOrderItem(
    $input: CreateOrderItemInput!
    $condition: ModelOrderItemConditionInput
  ) {
    createOrderItem(input: $input, condition: $condition) {
      id
      itemId
      orderId
      quantity
      createdAt
      updatedAt
      item {
        id
        name
        description
        price
        categoryId
        createdAt
        updatedAt
        category {
          id
          name
          createdAt
          updatedAt
        }
        orders {
          nextToken
        }
      }
      order {
        id
        customerEmail
        status
        createdAt
        total
        deliveryPeriod
        deliveryLocation
        changeRequired
        updatedAt
        items {
          nextToken
        }
      }
      addIns {
        items {
          id
          orderItemId
          addInId
          quantity
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateOrderItem = /* GraphQL */ `
  mutation UpdateOrderItem(
    $input: UpdateOrderItemInput!
    $condition: ModelOrderItemConditionInput
  ) {
    updateOrderItem(input: $input, condition: $condition) {
      id
      itemId
      orderId
      quantity
      createdAt
      updatedAt
      item {
        id
        name
        description
        price
        categoryId
        createdAt
        updatedAt
        category {
          id
          name
          createdAt
          updatedAt
        }
        orders {
          nextToken
        }
      }
      order {
        id
        customerEmail
        status
        createdAt
        total
        deliveryPeriod
        deliveryLocation
        changeRequired
        updatedAt
        items {
          nextToken
        }
      }
      addIns {
        items {
          id
          orderItemId
          addInId
          quantity
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteOrderItem = /* GraphQL */ `
  mutation DeleteOrderItem(
    $input: DeleteOrderItemInput!
    $condition: ModelOrderItemConditionInput
  ) {
    deleteOrderItem(input: $input, condition: $condition) {
      id
      itemId
      orderId
      quantity
      createdAt
      updatedAt
      item {
        id
        name
        description
        price
        categoryId
        createdAt
        updatedAt
        category {
          id
          name
          createdAt
          updatedAt
        }
        orders {
          nextToken
        }
      }
      order {
        id
        customerEmail
        status
        createdAt
        total
        deliveryPeriod
        deliveryLocation
        changeRequired
        updatedAt
        items {
          nextToken
        }
      }
      addIns {
        items {
          id
          orderItemId
          addInId
          quantity
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
