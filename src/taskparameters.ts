import * as core from '@actions/core';
import { IAuthorizer } from "azure-actions-webclient/Authorizer/IAuthorizer";
import { ContainerInstanceManagementModels } from '@azure/arm-containerinstance';
import { parse as yamlParse } from 'yaml';

export class TaskParameters {
    private static taskparams: TaskParameters;
    private _resourceGroup: string;
    // private _commandLine: Array<string>;
    // private _cpu: number;
    private _diagnostics: ContainerInstanceManagementModels.ContainerGroupDiagnostics;
    private _dnsNameLabel: string;
    // private _environmentVariables: Array<ContainerInstanceManagementModels.EnvironmentVariable>;
    // private _gpuCount: number;
    // private _gpuSKU: ContainerInstanceManagementModels.GpuSku;
    // private _image:string;
    private _ipAddress:ContainerInstanceManagementModels.ContainerGroupIpAddressType;
    private _location:string;
    // private _memory: number;
    // private _containerName: string;
    private _osType: ContainerInstanceManagementModels.OperatingSystemTypes;
    // private _ports: Array<ContainerInstanceManagementModels.Port>;
    private _protocol: ContainerInstanceManagementModels.ContainerGroupNetworkProtocol;
    private _registryLoginServer: string;
    private _registryUsername: string;
    private _registryPassword: string;
    private _restartPolicy: ContainerInstanceManagementModels.ContainerGroupRestartPolicy;
    private _volumes: Array<ContainerInstanceManagementModels.Volume>;
    // private _volumeMounts: Array<ContainerInstanceManagementModels.VolumeMount>;
    private _networkProfile?: ContainerInstanceManagementModels.ContainerGroupNetworkProfile;
    private _containers: ContainerInstanceManagementModels.Container[];
    
    private _subscriptionId: string;

    private constructor(endpoint: IAuthorizer) {
        this._subscriptionId = endpoint.subscriptionID;
        this._resourceGroup = core.getInput('resource-group', { required: true });
        // this._commandLine = [];
        // let commandLine = core.getInput("command-line");
        // if(commandLine) {
        //     commandLine.split(' ').forEach((command: string) => {
        //         this._commandLine.push(command);
        //     });
        // }
        // this._cpu = parseFloat(core.getInput('cpu'));
        this._dnsNameLabel = core.getInput('dns-name-label');
        this._diagnostics = {}
        let logType = core.getInput('log-type');
        let logAnalyticsWorkspace = core.getInput('log-analytics-workspace');
        let logAnalyticsWorkspaceKey = core.getInput('log-analytics-workspace-key');
        this._getDiagnostics(logAnalyticsWorkspace, logAnalyticsWorkspaceKey, logType);
        // let environmentVariables = core.getInput('environment-variables');
        // let secureEnvironmentVariables = core.getInput('secure-environment-variables');
        // this._environmentVariables = []
        // this._getEnvironmentVariables(environmentVariables, secureEnvironmentVariables);
        // let gpuCount = core.getInput('gpu-count');
        // let gpuSku = core.getInput('gpu-sku');
        // if(gpuSku && !gpuCount) {
        //     throw Error("You need to specify the count of GPU Resources with the SKU!"); 
        // } else {
        //     if(gpuCount && !gpuSku) {
        //         throw Error("GPU SKU is not specified for the count. Please provide the `gpu-sku` parameter");
        //     }
        //     this._gpuCount = parseInt(gpuCount);
        //     this._gpuSKU = (gpuSku == 'K80') ? 'K80' : ( gpuSku == 'P100' ? 'P100' : 'V100');
        // }
        // this._image = core.getInput('image', { required: true });
        const networkProfileId = core.getInput('network-profile');
        const ipAddress = core.getInput('ip-address');
        if(ipAddress && ["Public", "Private"].indexOf(ipAddress) < 0) {
            throw Error('The Value of IP Address must be either Public or Private');
        } else {
            if (ipAddress == 'Private') {
                if (!networkProfileId) {
                    throw Error('A network profile must be speicified if the IP address is set to Private');
                }
                if (!!this._dnsNameLabel) {
                    throw Error('A DNS label may not be specified if the IP address is set to Public');
                }
                this._ipAddress = 'Private';
                this._networkProfile = {
                    id: networkProfileId
                }
            } else {
                if (!!networkProfileId) {
                    throw Error('A network profile may not be speicified if the IP address is set to Public');
                }
                this._ipAddress = 'Public';
            }
        }
        this._location = core.getInput('location', { required: true });
        // this._memory = parseFloat(core.getInput('memory'));
        // this._containerName = core.getInput('name', { required: true });
        let osType = core.getInput('os-type');
        if(osType && ['Linux', 'Windows'].indexOf(osType) < 0) {
            throw Error('The Value of OS Type must be either Linux or Windows only!')
        } else {
            this._osType = (osType == 'Linux') ? 'Linux' : 'Windows';
        }
        // let ports = core.getInput('ports');
        // this._ports = [];
        // this._getPorts(ports);
        let protocol = core.getInput('protocol');
        if(protocol && ["TCP", "UDP"].indexOf(protocol) < 0) {
            throw Error("The Network Protocol can only be TCP or UDP");
        } else {
            this._protocol = protocol == "TCP" ? 'TCP' : 'UDP';
        }
        this._registryLoginServer = core.getInput('registry-login-server');
        if(!this._registryLoginServer) {
            // If the user doesn't give registry login server and the registry is ACR
            let imageList = this._registryLoginServer.split('/');
            if(imageList[0].indexOf('azurecr') > -1) {
                this._registryLoginServer = imageList[0];
            }
        }
        this._registryUsername = core.getInput('registry-username');
        this._registryPassword = core.getInput('registry-password');
        let restartPolicy = core.getInput('restart-policy');
        if(restartPolicy && ["Always", "OnFailure", "Never"].indexOf(restartPolicy) < 0) {
            throw Error('The Value of Restart Policy can be "Always", "OnFailure" or "Never" only!');
        } else {
            this._restartPolicy = ( restartPolicy == 'Always' ) ? 'Always' : ( restartPolicy == 'Never' ? 'Never' : 'OnFailure');
        }

        this._volumes = [];
        // this._volumeMounts = [];
        this._getSecretVolume();
        this._getGitVolume();
        this._getAzureFileShareVolume();

        this._containers = this._getContainers(core.getInput('containers'));
    }

    private _getContainers(containersStr: string): ContainerInstanceManagementModels.Container[] {
        const containersObj = yamlParse(containersStr);
        if (!containersObj || !Array.isArray(containersObj)) {
            throw Error("Containers field must be a list");
        }
        return containersObj.map(item => {
            if (!item['name'] || typeof item['name'] !== 'string') {
                throw new Error('Container name may not be empty');
            }
            if (!item['image'] || typeof item['image'] !== 'string') {
                throw new Error('Container image may not be empty');
            }
            const cpu = parseFloat(item.cpu);
            if (cpu <= 0) {
                throw new Error('Container must have positive cpu parameter');
            }
            const memory = parseFloat(item.memory);
            if (memory <= 0) {
                throw new Error('Container must have positive memory parameter');
            }
            const container = {
                name: item['name'],
                image: item['image'],
                resources: {
                    requests: {
                        memoryInGB: memory,
                        cpu: cpu
                    }
                },
            } as ContainerInstanceManagementModels.Container;

            if (!!item.command && typeof item.command === 'string') {
                container.command = item.command.split(' ');
            }

            if (!!item.ports && typeof(item.ports === 'string')) {
                container.ports = this._getPorts(item.ports);
            }

            const envVars = !!item['environment-variables'] && typeof item['environment-variables'] === 'string' ? item['environment-variables'] : '';
            const secureEnvVars = !!item['secure-environment-variables'] && typeof item['secure-environment-variables'] === 'string' ? item['secure-environment-variables'] : '';
            const variables = this._getEnvironmentVariables(envVars, secureEnvVars);
            if (variables.length > 0) {
                container.environmentVariables = variables;
            }

            // volumeMounts?: VolumeMount[];

            return container;
        });
    }

    private _getDiagnostics(logAnalyticsWorkspace: string, logAnalyticsWorkspaceKey: string, logType: string) {
        if(logAnalyticsWorkspace || logAnalyticsWorkspaceKey) {
            if(!logAnalyticsWorkspaceKey || !logAnalyticsWorkspace) {
                throw Error("The Log Analytics Workspace Id or Workspace Key are not provided. Please fill in the appropriate parameters.");
            }
            if(logType && ['ContainerInsights', 'ContainerInstanceLogs'].indexOf(logType) < 0) {
                throw Error("Log Type Can be Only of Type `ContainerInsights` or `ContainerInstanceLogs`");
            }
            let logAnalytics: ContainerInstanceManagementModels.LogAnalytics = { "workspaceId": logAnalyticsWorkspace, 
                                                                                 "workspaceKey": logAnalyticsWorkspaceKey };
            if(logType) {
                let logT: ContainerInstanceManagementModels.LogAnalyticsLogType;
                logT = (logType == 'ContainerInsights') ? 'ContainerInsights' : 'ContainerInstanceLogs';
                logAnalytics.logType = logT;
            }
            this._diagnostics = { "logAnalytics": logAnalytics };
        }
    }

    private _getEnvironmentVariables(environmentVariables: string, secureEnvironmentVariables: string): Array<ContainerInstanceManagementModels.EnvironmentVariable> {
        const variables: Array<ContainerInstanceManagementModels.EnvironmentVariable> = [];
        if(environmentVariables) {
            let keyValuePairs = environmentVariables.split(' ');
            keyValuePairs.forEach((pair: string) => {
                let pairList = pair.split('=');
                let obj: ContainerInstanceManagementModels.EnvironmentVariable = { "name": pairList[0], "value": pairList[1] };
                variables.push(obj);
            })
        }
        if(secureEnvironmentVariables) {
            let keyValuePairs = secureEnvironmentVariables.split(' ');
            keyValuePairs.forEach((pair: string) => {
                let pairList = pair.split('=');
                let obj: ContainerInstanceManagementModels.EnvironmentVariable = { "name": pairList[0], "secureValue": pairList[1] };
                variables.push(obj);
            })
        }
        return variables;
    }

    private  _getPorts(ports: string): Array<ContainerInstanceManagementModels.Port> {
        let portObjArr: Array<ContainerInstanceManagementModels.Port> = [];
        ports.split(' ').forEach((portStr: string) => {
            let portInt = parseInt(portStr);
            portObjArr.push({ "port": portInt });
        });
        return portObjArr;
    }

    private _getSecretVolume() {
        const secretsStr = core.getInput('secrets-volume');
        if (!secretsStr) {
            return;
        }
        const mountPath = core.getInput('secrets-mount-path');
        if (!mountPath) {
            throw new Error("The Mount Path for Secrets Volume is not specified.");
        }
        const secretsMap = secretsStr.split(' ').reduce((accumulator, nextKeyVal) => {
            const keyval = nextKeyVal.split(/=(.+)/);
            accumulator[keyval[0].replace('_', '.')] = keyval[1] || '';
            return accumulator;
        }, {} as { [propertyName: string]: string });

        const volMount: ContainerInstanceManagementModels.VolumeMount = { "name": "secrets-vol", "mountPath": mountPath, readOnly: true };
        this._volumes.push({ "name": volMount.name, secret: secretsMap });
        this._volumeMounts.push(volMount);
    }

    private _getGitVolume() {
        const gitRepoVolumeUrl = core.getInput('gitrepo-url');
        if (!gitRepoVolumeUrl) {
            return;
        }
        const gitRepoDir = core.getInput('gitrepo-dir');
        const gitRepoMountPath = core.getInput('gitrepo-mount-path');
        const gitRepoRevision = core.getInput('gitrepo-revision');
        const vol: ContainerInstanceManagementModels.GitRepoVolume = { "repository": gitRepoVolumeUrl };
        if(!gitRepoMountPath) {
            throw Error("The Mount Path for GitHub Volume is not specified.");
        }
        if(gitRepoDir) {
            vol.directory = gitRepoDir;
        }
        if(gitRepoRevision) {
            vol.revision = gitRepoRevision;
        }
        const volMount: ContainerInstanceManagementModels.VolumeMount = { "name":"git-repo-vol", "mountPath":gitRepoMountPath };
        this._volumes.push({ "name": "git-repo-vol", gitRepo: vol });
        this._volumeMounts.push(volMount);
    }

    private _getAzureFileShareVolume() {
        const afsAccountName = core.getInput('azure-file-volume-account-name');
        const afsShareName = core.getInput('azure-file-volume-share-name');

        if(!afsShareName && !afsAccountName) {
            return;
        }
        if(!afsShareName) {
            throw Error("The Name of the Azure File Share is required to mount it as a volume");
        }
        if(!afsAccountName) {
            throw Error("The Storage Account Name for the Azure File Share is required to mount it as a volume");
        }

        const afsMountPath = core.getInput('azure-file-volume-mount-path');
        const afsAccountKey = core.getInput('azure-file-volume-account-key');
        const afsReadOnly = core.getInput('azure-file-volume-read-only');
        if(!afsMountPath) {
            throw Error("The Mount Path for Azure File Share Volume is not specified");
        }
        const vol: ContainerInstanceManagementModels.AzureFileVolume = { "shareName": afsShareName, "storageAccountName": afsAccountName };
        if(afsAccountKey) {
            vol.storageAccountKey = afsAccountKey;
        }
        const volMount: ContainerInstanceManagementModels.VolumeMount = { "name": "azure-file-share-vol", "mountPath": afsMountPath };
        if(afsReadOnly) {
            if(["true", "false"].indexOf(afsReadOnly) < 0) {
                throw Error("The Read-Only Flag can only be `true` or `false` for the Azure File Share Volume");
            }
            vol.readOnly = (afsReadOnly == "true");
            volMount.readOnly = (afsReadOnly == "true");
        }
        this._volumes.push({ "name": "azure-file-share-vol", azureFile: vol });
        this._volumeMounts.push(volMount);
    }

    public static getTaskParams(endpoint: IAuthorizer) {
        if(!this.taskparams) {
            this.taskparams = new TaskParameters(endpoint);
        }
        return this.taskparams;
    }

    public get resourceGroup() {
        return this._resourceGroup;
    }

    // public get commandLine() {
    //     return this._commandLine;
    // }

    // public get cpu() {
    //     return this._cpu;
    // }

    public get diagnostics() {
        return this._diagnostics;
    }

    public get dnsNameLabel() {
        return this._dnsNameLabel;
    }

    // public get environmentVariables() {
    //     return this._environmentVariables;
    // }

    // public get gpuCount() {
    //     return this._gpuCount;
    // }

    // public get gpuSku() {
    //     return this._gpuSKU;
    // }

    // public get image() {
    //     return this._image;
    // }

    public get ipAddress() {
        return this._ipAddress;
    }

    public get networkProfile() {
        return this._networkProfile;
    }

    public get location() {
        return this._location;
    }

    // public get memory() {
    //     return this._memory;
    // }

    // public get containerName() {
    //     return this._containerName;
    // }

    public get osType() {
        return this._osType;
    }

    // public get ports() {
    //     return this._ports;
    // }

    public get protocol() {
        return this._protocol;
    }

    public get registryLoginServer() {
        return this._registryLoginServer;
    }

    public get registryUsername() {
        return this._registryUsername;
    }

    public get registryPassword() {
        return  this._registryPassword;
    }

    public get restartPolicy() {
        return this._restartPolicy;
    }

    public get volumes() {
        return this._volumes;
    }

    // public get volumeMounts() {
    //     return this._volumeMounts;
    // }

    public get subscriptionId() {
        return this._subscriptionId;
    }
}