/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as Models from "../models";
import * as Mappers from "../models/containerGroupsMappers";
import * as Parameters from "../models/parameters";
import { ContainerInstanceManagementClientContext } from "../containerInstanceManagementClientContext";

/** Class representing a ContainerGroups. */
export class ContainerGroups {
  private readonly client: ContainerInstanceManagementClientContext;

  /**
   * Create a ContainerGroups.
   * @param {ContainerInstanceManagementClientContext} client Reference to the service client.
   */
  constructor(client: ContainerInstanceManagementClientContext) {
    this.client = client;
  }

  /**
   * Get a list of container groups in the specified subscription. This operation returns properties
   * of each container group including containers, image registry credentials, restart policy, IP
   * address type, OS type, state, and volumes.
   * @summary Get a list of container groups in the specified subscription.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerGroupsListResponse>
   */
  list(options?: msRest.RequestOptionsBase): Promise<Models.ContainerGroupsListResponse>;
  /**
   * @param callback The callback
   */
  list(callback: msRest.ServiceCallback<Models.ContainerGroupListResult>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  list(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ContainerGroupListResult>): void;
  list(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ContainerGroupListResult>, callback?: msRest.ServiceCallback<Models.ContainerGroupListResult>): Promise<Models.ContainerGroupsListResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      listOperationSpec,
      callback) as Promise<Models.ContainerGroupsListResponse>;
  }

  /**
   * Get a list of container groups in a specified subscription and resource group. This operation
   * returns properties of each container group including containers, image registry credentials,
   * restart policy, IP address type, OS type, state, and volumes.
   * @summary Get a list of container groups in the specified subscription and resource group.
   * @param resourceGroupName The name of the resource group.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerGroupsListByResourceGroupResponse>
   */
  listByResourceGroup(resourceGroupName: string, options?: msRest.RequestOptionsBase): Promise<Models.ContainerGroupsListByResourceGroupResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param callback The callback
   */
  listByResourceGroup(resourceGroupName: string, callback: msRest.ServiceCallback<Models.ContainerGroupListResult>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByResourceGroup(resourceGroupName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ContainerGroupListResult>): void;
  listByResourceGroup(resourceGroupName: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ContainerGroupListResult>, callback?: msRest.ServiceCallback<Models.ContainerGroupListResult>): Promise<Models.ContainerGroupsListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        options
      },
      listByResourceGroupOperationSpec,
      callback) as Promise<Models.ContainerGroupsListByResourceGroupResponse>;
  }

  /**
   * Gets the properties of the specified container group in the specified subscription and resource
   * group. The operation returns the properties of each container group including containers, image
   * registry credentials, restart policy, IP address type, OS type, state, and volumes.
   * @summary Get the properties of the specified container group.
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerGroupsGetResponse>
   */
  get(resourceGroupName: string, containerGroupName: string, options?: msRest.RequestOptionsBase): Promise<Models.ContainerGroupsGetResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param callback The callback
   */
  get(resourceGroupName: string, containerGroupName: string, callback: msRest.ServiceCallback<Models.ContainerGroup>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(resourceGroupName: string, containerGroupName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ContainerGroup>): void;
  get(resourceGroupName: string, containerGroupName: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ContainerGroup>, callback?: msRest.ServiceCallback<Models.ContainerGroup>): Promise<Models.ContainerGroupsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        containerGroupName,
        options
      },
      getOperationSpec,
      callback) as Promise<Models.ContainerGroupsGetResponse>;
  }

  /**
   * Create or update container groups with specified configurations.
   * @summary Create or update container groups.
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param containerGroup The properties of the container group to be created or updated.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerGroupsCreateOrUpdateResponse>
   */
  createOrUpdate(resourceGroupName: string, containerGroupName: string, containerGroup: Models.ContainerGroup, options?: msRest.RequestOptionsBase): Promise<Models.ContainerGroupsCreateOrUpdateResponse> {
    return this.beginCreateOrUpdate(resourceGroupName,containerGroupName,containerGroup,options)
      .then(lroPoller => lroPoller.pollUntilFinished()) as Promise<Models.ContainerGroupsCreateOrUpdateResponse>;
  }

  /**
   * Updates container group tags with specified values.
   * @summary Update container groups.
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param resource The container group resource with just the tags to be updated.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerGroupsUpdateResponse>
   */
  update(resourceGroupName: string, containerGroupName: string, resource: Models.Resource, options?: msRest.RequestOptionsBase): Promise<Models.ContainerGroupsUpdateResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param resource The container group resource with just the tags to be updated.
   * @param callback The callback
   */
  update(resourceGroupName: string, containerGroupName: string, resource: Models.Resource, callback: msRest.ServiceCallback<Models.ContainerGroup>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param resource The container group resource with just the tags to be updated.
   * @param options The optional parameters
   * @param callback The callback
   */
  update(resourceGroupName: string, containerGroupName: string, resource: Models.Resource, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ContainerGroup>): void;
  update(resourceGroupName: string, containerGroupName: string, resource: Models.Resource, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ContainerGroup>, callback?: msRest.ServiceCallback<Models.ContainerGroup>): Promise<Models.ContainerGroupsUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        containerGroupName,
        resource,
        options
      },
      updateOperationSpec,
      callback) as Promise<Models.ContainerGroupsUpdateResponse>;
  }

  /**
   * Delete the specified container group in the specified subscription and resource group. The
   * operation does not delete other resources provided by the user, such as volumes.
   * @summary Delete the specified container group.
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerGroupsDeleteMethodResponse>
   */
  deleteMethod(resourceGroupName: string, containerGroupName: string, options?: msRest.RequestOptionsBase): Promise<Models.ContainerGroupsDeleteMethodResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param callback The callback
   */
  deleteMethod(resourceGroupName: string, containerGroupName: string, callback: msRest.ServiceCallback<Models.ContainerGroup>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param options The optional parameters
   * @param callback The callback
   */
  deleteMethod(resourceGroupName: string, containerGroupName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ContainerGroup>): void;
  deleteMethod(resourceGroupName: string, containerGroupName: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ContainerGroup>, callback?: msRest.ServiceCallback<Models.ContainerGroup>): Promise<Models.ContainerGroupsDeleteMethodResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        containerGroupName,
        options
      },
      deleteMethodOperationSpec,
      callback) as Promise<Models.ContainerGroupsDeleteMethodResponse>;
  }

  /**
   * Restarts all containers in a container group in place. If container image has updates, new image
   * will be downloaded.
   * @summary Restarts all containers in a container group.
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  restart(resourceGroupName: string, containerGroupName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse> {
    return this.beginRestart(resourceGroupName,containerGroupName,options)
      .then(lroPoller => lroPoller.pollUntilFinished());
  }

  /**
   * Stops all containers in a container group. Compute resources will be deallocated and billing
   * will stop.
   * @summary Stops all containers in a container group.
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  stop(resourceGroupName: string, containerGroupName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param callback The callback
   */
  stop(resourceGroupName: string, containerGroupName: string, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param options The optional parameters
   * @param callback The callback
   */
  stop(resourceGroupName: string, containerGroupName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  stop(resourceGroupName: string, containerGroupName: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        containerGroupName,
        options
      },
      stopOperationSpec,
      callback);
  }

  /**
   * Starts all containers in a container group.
   * @summary Starts all containers in a container group.
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  start(resourceGroupName: string, containerGroupName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse> {
    return this.beginStart(resourceGroupName,containerGroupName,options)
      .then(lroPoller => lroPoller.pollUntilFinished());
  }

  /**
   * Create or update container groups with specified configurations.
   * @summary Create or update container groups.
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param containerGroup The properties of the container group to be created or updated.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginCreateOrUpdate(resourceGroupName: string, containerGroupName: string, containerGroup: Models.ContainerGroup, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        resourceGroupName,
        containerGroupName,
        containerGroup,
        options
      },
      beginCreateOrUpdateOperationSpec,
      options);
  }

  /**
   * Restarts all containers in a container group in place. If container image has updates, new image
   * will be downloaded.
   * @summary Restarts all containers in a container group.
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginRestart(resourceGroupName: string, containerGroupName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        resourceGroupName,
        containerGroupName,
        options
      },
      beginRestartOperationSpec,
      options);
  }

  /**
   * Starts all containers in a container group.
   * @summary Starts all containers in a container group.
   * @param resourceGroupName The name of the resource group.
   * @param containerGroupName The name of the container group.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginStart(resourceGroupName: string, containerGroupName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        resourceGroupName,
        containerGroupName,
        options
      },
      beginStartOperationSpec,
      options);
  }

  /**
   * Get a list of container groups in the specified subscription. This operation returns properties
   * of each container group including containers, image registry credentials, restart policy, IP
   * address type, OS type, state, and volumes.
   * @summary Get a list of container groups in the specified subscription.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerGroupsListNextResponse>
   */
  listNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.ContainerGroupsListNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ContainerGroupListResult>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ContainerGroupListResult>): void;
  listNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ContainerGroupListResult>, callback?: msRest.ServiceCallback<Models.ContainerGroupListResult>): Promise<Models.ContainerGroupsListNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listNextOperationSpec,
      callback) as Promise<Models.ContainerGroupsListNextResponse>;
  }

  /**
   * Get a list of container groups in a specified subscription and resource group. This operation
   * returns properties of each container group including containers, image registry credentials,
   * restart policy, IP address type, OS type, state, and volumes.
   * @summary Get a list of container groups in the specified subscription and resource group.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.ContainerGroupsListByResourceGroupNextResponse>
   */
  listByResourceGroupNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.ContainerGroupsListByResourceGroupNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listByResourceGroupNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ContainerGroupListResult>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByResourceGroupNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ContainerGroupListResult>): void;
  listByResourceGroupNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ContainerGroupListResult>, callback?: msRest.ServiceCallback<Models.ContainerGroupListResult>): Promise<Models.ContainerGroupsListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listByResourceGroupNextOperationSpec,
      callback) as Promise<Models.ContainerGroupsListByResourceGroupNextResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.ContainerInstance/containerGroups",
  urlParameters: [
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ContainerGroupListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listByResourceGroupOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ContainerGroupListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const getOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.containerGroupName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ContainerGroup
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const updateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PATCH",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.containerGroupName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "resource",
    mapper: {
      ...Mappers.Resource,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.ContainerGroup
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const deleteMethodOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.containerGroupName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ContainerGroup
    },
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const stopOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/stop",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.containerGroupName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const beginCreateOrUpdateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.containerGroupName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "containerGroup",
    mapper: {
      ...Mappers.ContainerGroup,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.ContainerGroup
    },
    201: {
      bodyMapper: Mappers.ContainerGroup
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const beginRestartOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/restart",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.containerGroupName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const beginStartOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/start",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.containerGroupName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ContainerGroupListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listByResourceGroupNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.ContainerGroupListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};
