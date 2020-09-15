/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
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
export const onCreateAddIn = /* GraphQL */ `
  subscription OnCreateAddIn {
    onCreateAddIn {
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
export const onUpdateAddIn = /* GraphQL */ `
  subscription OnUpdateAddIn {
    onUpdateAddIn {
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
export const onDeleteAddIn = /* GraphQL */ `
  subscription OnDeleteAddIn {
    onDeleteAddIn {
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
export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer {
    onCreateCustomer {
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
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer {
    onUpdateCustomer {
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
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer {
    onDeleteCustomer {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
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
export const onCreateOrderItemAddIn = /* GraphQL */ `
  subscription OnCreateOrderItemAddIn {
    onCreateOrderItemAddIn {
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
export const onUpdateOrderItemAddIn = /* GraphQL */ `
  subscription OnUpdateOrderItemAddIn {
    onUpdateOrderItemAddIn {
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
export const onDeleteOrderItemAddIn = /* GraphQL */ `
  subscription OnDeleteOrderItemAddIn {
    onDeleteOrderItemAddIn {
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
export const onCreateOrderItem = /* GraphQL */ `
  subscription OnCreateOrderItem {
    onCreateOrderItem {
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
export const onUpdateOrderItem = /* GraphQL */ `
  subscription OnUpdateOrderItem {
    onUpdateOrderItem {
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
export const onDeleteOrderItem = /* GraphQL */ `
  subscription OnDeleteOrderItem {
    onDeleteOrderItem {
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
