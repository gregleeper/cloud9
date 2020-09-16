/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        price
        categoryId
        createdAt
        updatedAt
        isAvailable
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
      nextToken
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      name
      description
      price
      categoryId
      createdAt
      updatedAt
      isAvailable
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
export const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        items {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
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
export const listAddIns = /* GraphQL */ `
  query ListAddIns(
    $filter: ModelAddInFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddIns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        isAvailable
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
      nextToken
    }
  }
`;
export const getAddIn = /* GraphQL */ `
  query GetAddIn($id: ID!) {
    getAddIn(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      isAvailable
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
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
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
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        customerEmail
        username
        createdAt
        updatedAt
        orders {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getCustomerByEmail = /* GraphQL */ `
  query GetCustomerByEmail(
    $customerEmail: String
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getCustomerByEmail(
      customerEmail: $customerEmail
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        customerEmail
        username
        createdAt
        updatedAt
        orders {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        items {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
export const ordersByStatusByCreatedAt = /* GraphQL */ `
  query OrdersByStatusByCreatedAt(
    $status: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByStatusByCreatedAt(
      status: $status
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        items {
          items {
            quantity
            item {
              id
              name
              price
            }
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const ordersByStatusByPeriod = /* GraphQL */ `
  query OrdersByStatusByPeriod(
    $status: String
    $deliveryPeriodCreatedAt: ModelOrderOrdersByStatusByPeriodByCustomerEmailCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByStatusByPeriod(
      status: $status
      deliveryPeriodCreatedAt: $deliveryPeriodCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        items {
          items {
            quantity
            item {
              id
              name
              price
            }
            addIns {
              items {
                quantity
                addIn {
                  name
                  id
                }
              }
            }
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const ordersByCustomerEmail = /* GraphQL */ `
  query OrdersByCustomerEmail(
    $customerEmail: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByCustomerEmail(
      customerEmail: $customerEmail
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        items {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getOrderItemAddIn = /* GraphQL */ `
  query GetOrderItemAddIn($id: ID!) {
    getOrderItemAddIn(id: $id) {
      id
      orderItemId
      addInId
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
export const listOrderItemAddIns = /* GraphQL */ `
  query ListOrderItemAddIns(
    $filter: ModelOrderItemAddInFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderItemAddIns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        orderItemId
        addInId
        createdAt
        updatedAt
        addIn {
          id
          name
          description
          createdAt
          updatedAt
        }
        orderItem {
          id
          itemId
          orderId
          quantity
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listOrderItems = /* GraphQL */ `
  query ListOrderItems(
    $filter: ModelOrderItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getOrderItem = /* GraphQL */ `
  query GetOrderItem($id: ID!) {
    getOrderItem(id: $id) {
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
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
