(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) =>
    key in obj
      ? __defProp(obj, key, {
          enumerable: true,
          configurable: true,
          writable: true,
          value,
        })
      : (obj[key] = value);
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) =>
        x.done
          ? resolve(x.value)
          : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/contracts/redstone-oracle-registry/common/listWithPagination.ts
  var listWithPagination = (paginationData, oracles) => {
    let oraclesArray = Object.keys(oracles);
    if (paginationData == null ? void 0 : paginationData.startAfter) {
      oraclesArray = oraclesArray.slice(paginationData.startAfter);
    }
    if (paginationData == null ? void 0 : paginationData.limit) {
      oraclesArray = oraclesArray.slice(0, paginationData.limit);
    }
    return oraclesArray;
  };

  // src/contracts/redstone-oracle-registry/nodes/read/listNodes.ts
  var listNodes = (state, input) => {
    const paginationData = input.data;
    const nodesArray = listWithPagination(paginationData, state.nodes);
    return { result: nodesArray };
  };

  // src/contracts/redstone-oracle-registry/common/getDetailsById.ts
  var getDetailsById = ({ identifier, state, oraclesType }) => {
    if (!identifier) {
      throw new ContractError("Missing oracle identifier");
    }
    const oracleDetails = state[oraclesType][identifier];
    if (!oracleDetails) {
      throw new ContractError(
        `Oracle with identifier ${identifier} does not exist`
      );
    }
    const identifierObject =
      oraclesType === "nodes" ? { address: identifier } : { id: identifier };
    return __spreadValues(__spreadValues({}, oracleDetails), identifierObject);
  };

  // src/contracts/redstone-oracle-registry/nodes/read/getNodeDetails.ts
  var getNodeDetails = (state, input) => {
    const data = input.data;
    const nodesDetails = getDetailsById({
      identifier: data == null ? void 0 : data.address,
      state,
      oraclesType: "nodes",
    });
    return { result: nodesDetails };
  };

  // src/contracts/redstone-oracle-registry/nodes/write/registerNode.ts
  var registerNode = (state, action) => {
    const data = action.input.data;
    const caller = action.caller;
    const isValidData =
      data.name &&
      data.logo &&
      data.description &&
      data.dataServiceId &&
      data.evmAddress &&
      data.ipAddress &&
      data.ecdsaPublicKey &&
      data.arweavePublicKey;
    if (!isValidData) {
      throw new ContractError("Invalid node data");
    }
    if (state.nodes[caller]) {
      throw new ContractError(`Node with owner ${caller} already exists`);
    }
    if (!state.dataServices[data.dataServiceId]) {
      throw new ContractError(
        `Data feed with id ${data.dataServiceId} does not exist`
      );
    }
    state.nodes[caller] = data;
    return { state };
  };

  // src/contracts/redstone-oracle-registry/nodes/write/updateNodeDetails.ts
  var updateNodeDetails = (state, action) => {
    const data = action.input.data;
    const caller = action.caller;
    const currentNodeState = state.nodes[caller];
    if (!currentNodeState) {
      throw new ContractError(`Node with owner ${caller} not found`);
    }
    state.nodes[caller] = __spreadValues(
      __spreadValues({}, currentNodeState),
      data
    );
    return { state };
  };

  // src/contracts/redstone-oracle-registry/nodes/write/removeNode.ts
  var removeNode = (state, caller) => {
    const currentNodeState = state.nodes[caller];
    if (!currentNodeState) {
      throw new ContractError(`Node with owner ${caller} not found`);
    }
    delete state.nodes[caller];
    return { state };
  };

  // src/contracts/redstone-oracle-registry/data-services/read/listDataServices.ts
  var listDataServices = (state, input) => {
    const paginationData = input.data;
    const dataServicesArray = listWithPagination(
      paginationData,
      state.dataServices
    );
    return { result: dataServicesArray };
  };

  // src/contracts/redstone-oracle-registry/data-services/read/getDataServiceDetailsById.ts
  var getDataServiceDetailsById = (state, input) => {
    const data = input.data;
    const dataServiceDetails = getDetailsById({
      identifier: data == null ? void 0 : data.id,
      state,
      oraclesType: "dataServices",
    });
    return { result: dataServiceDetails };
  };

  // src/contracts/redstone-oracle-registry/data-services/write/createDataService.ts
  var createDataService = (state, action) => {
    const data = action.input.data;
    const isValidData =
      data.id &&
      data.name &&
      data.logo &&
      data.description &&
      data.manifestTxId;
    if (!isValidData) {
      throw new ContractError("Invalid data feed data");
    }
    const _a = data,
      { id } = _a,
      restData = __objRest(_a, ["id"]);
    if (state.dataServices[id]) {
      throw new ContractError(`Data feed with id ${id} already exists`);
    }
    state.dataServices[id] = __spreadProps(__spreadValues({}, restData), {
      admin: action.caller,
    });
    return { state };
  };

  // src/contracts/redstone-oracle-registry/data-services/write/updateDataService.ts
  var updateDataService = (state, action) => {
    const data = action.input.data;
    const { id, update } = data;
    const currentDataServiceState = state.dataServices[id];
    if (!currentDataServiceState) {
      throw new ContractError(`Data feed with id ${id} not found`);
    }
    if (action.caller !== currentDataServiceState.admin) {
      throw new ContractError("Only admin can update data feed");
    }
    state.dataServices[id] = __spreadValues(
      __spreadValues({}, currentDataServiceState),
      update
    );
    return { state };
  };

  // src/contracts/redstone-oracle-registry/evolve.ts
  var evolve = (state, action) => {
    if (!state.canEvolve) {
      throw new ContractError("Contract cannot evolve");
    }
    if (!state.contractAdmins.some((admin) => admin === action.caller)) {
      throw new ContractError("Only the admin can evolve a contract");
    }
    const data = action.input.data;
    state.evolve = data.evolveTransactionId;
    return { state };
  };

  // src/contracts/redstone-oracle-registry/redstone-oracle-registry.contract.ts
  var handle = (state, action) =>
    __async(void 0, null, function* () {
      const { input } = action;
      switch (input.function) {
        case "listNodes":
          return listNodes(state, input);
        case "getNodeDetails":
          return getNodeDetails(state, input);
        case "registerNode":
          return registerNode(state, action);
        case "updateNodeDetails":
          return updateNodeDetails(state, action);
        case "removeNode":
          return removeNode(state, action.caller);
        case "listDataServices":
          return listDataServices(state, input);
        case "getDataServiceDetailsById":
          return getDataServiceDetailsById(state, input);
        case "createDataService":
          return createDataService(state, action);
        case "updateDataService":
          return updateDataService(state, action);
        case "evolve":
          return evolve(state, action);
        default:
          throw new ContractError(
            `No function supplied or function not recognized: "${input.function}"`
          );
      }
    });
})();
