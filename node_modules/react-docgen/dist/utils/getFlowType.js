'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = getFlowType;

var _getPropertyName = require('./getPropertyName');

var _getPropertyName2 = _interopRequireDefault(_getPropertyName);

var _printValue = require('./printValue');

var _printValue2 = _interopRequireDefault(_printValue);

var _recast = require('recast');

var _recast2 = _interopRequireDefault(_recast);

var _getTypeAnnotation = require('../utils/getTypeAnnotation');

var _getTypeAnnotation2 = _interopRequireDefault(_getTypeAnnotation);

var _resolveToValue = require('../utils/resolveToValue');

var _resolveToValue2 = _interopRequireDefault(_resolveToValue);

var _resolveObjectKeysToArray = require('../utils/resolveObjectKeysToArray');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 *
 */

/* eslint no-use-before-define: 0 */

var types = _recast2.default.types.namedTypes;


var flowTypes = {
  AnyTypeAnnotation: 'any',
  BooleanTypeAnnotation: 'boolean',
  MixedTypeAnnotation: 'mixed',
  NumberTypeAnnotation: 'number',
  StringTypeAnnotation: 'string',
  VoidTypeAnnotation: 'void'
};

var flowLiteralTypes = {
  BooleanLiteralTypeAnnotation: 1,
  NumberLiteralTypeAnnotation: 1,
  StringLiteralTypeAnnotation: 1
};

var namedTypes = {
  GenericTypeAnnotation: handleGenericTypeAnnotation,
  ObjectTypeAnnotation: handleObjectTypeAnnotation,
  UnionTypeAnnotation: handleUnionTypeAnnotation,
  NullableTypeAnnotation: handleNullableTypeAnnotation,
  FunctionTypeAnnotation: handleFunctionTypeAnnotation,
  IntersectionTypeAnnotation: handleIntersectionTypeAnnotation,
  TupleTypeAnnotation: handleTupleTypeAnnotation,
  TypeofTypeAnnotation: handleTypeofTypeAnnotation
};

function getFlowTypeWithRequirements(path) {
  var type = getFlowType(path);

  type.required = !path.parentPath.node.optional;

  return type;
}

function handleKeysHelper(path) {
  var value = path.get('typeParameters', 'params', 0);
  if (types.TypeofTypeAnnotation.check(value.node)) {
    value = value.get('argument', 'id');
  } else {
    value = value.get('id');
  }
  var resolvedPath = (0, _resolveToValue2.default)(value);
  if (resolvedPath && types.ObjectExpression.check(resolvedPath.node)) {
    var keys = (0, _resolveObjectKeysToArray.resolveObjectExpressionToNameArray)(resolvedPath, true);

    if (keys) {
      return {
        name: 'union',
        raw: (0, _printValue2.default)(path),
        elements: keys.map(function (value) {
          return { name: 'literal', value };
        })
      };
    }
  }
}

function handleGenericTypeAnnotation(path) {
  if (path.node.id.name === '$Keys' && path.node.typeParameters) {
    return handleKeysHelper(path);
  }

  var type = void 0;
  if (types.QualifiedTypeIdentifier.check(path.node.id)) {
    type = handleQualifiedTypeIdentifier(path.get('id'));
  } else {
    type = { name: path.node.id.name };
  }

  if (path.node.typeParameters) {
    var params = path.get('typeParameters').get('params');

    type = (0, _extends3.default)({}, type, {
      elements: params.map(function (param) {
        return getFlowType(param);
      }),
      raw: (0, _printValue2.default)(path)
    });
  } else {
    var resolvedPath = (0, _resolveToValue2.default)(path.get('id'));
    if (resolvedPath && resolvedPath.node.right) {
      type = getFlowType(resolvedPath.get('right'));
    }
  }

  return type;
}

function handleObjectTypeAnnotation(path) {
  var type = {
    name: 'signature',
    type: 'object',
    raw: (0, _printValue2.default)(path),
    signature: { properties: [] }
  };

  path.get('callProperties').each(function (param) {
    type.signature.constructor = getFlowType(param.get('value'));
  });

  path.get('indexers').each(function (param) {
    type.signature.properties.push({
      key: getFlowType(param.get('key')),
      value: getFlowTypeWithRequirements(param.get('value'))
    });
  });

  path.get('properties').each(function (param) {
    type.signature.properties.push({
      key: (0, _getPropertyName2.default)(param),
      value: getFlowTypeWithRequirements(param.get('value'))
    });
  });

  return type;
}

function handleUnionTypeAnnotation(path) {
  return {
    name: 'union',
    raw: (0, _printValue2.default)(path),
    elements: path.get('types').map(function (subType) {
      return getFlowType(subType);
    })
  };
}

function handleIntersectionTypeAnnotation(path) {
  return {
    name: 'intersection',
    raw: (0, _printValue2.default)(path),
    elements: path.get('types').map(function (subType) {
      return getFlowType(subType);
    })
  };
}

function handleNullableTypeAnnotation(path) {
  var typeAnnotation = (0, _getTypeAnnotation2.default)(path);

  if (!typeAnnotation) return null;

  var type = getFlowType(typeAnnotation);
  type.nullable = true;

  return type;
}

function handleFunctionTypeAnnotation(path) {
  var type = {
    name: 'signature',
    type: 'function',
    raw: (0, _printValue2.default)(path),
    signature: {
      arguments: [],
      return: getFlowType(path.get('returnType'))
    }
  };

  path.get('params').each(function (param) {
    var typeAnnotation = (0, _getTypeAnnotation2.default)(param);
    if (!typeAnnotation) return null;

    type.signature.arguments.push({
      name: param.node.name ? param.node.name.name : '',
      type: getFlowType(typeAnnotation)
    });
  });

  return type;
}

function handleTupleTypeAnnotation(path) {
  var type = { name: 'tuple', raw: (0, _printValue2.default)(path), elements: [] };

  path.get('types').each(function (param) {
    type.elements.push(getFlowType(param));
  });

  return type;
}

function handleTypeofTypeAnnotation(path) {
  return getFlowType(path.get('argument'));
}

function handleQualifiedTypeIdentifier(path) {
  if (path.node.qualification.name !== 'React') return;

  return { name: `React${path.node.id.name}`, raw: (0, _printValue2.default)(path) };
}

/**
 * Tries to identify the flow type by inspecting the path for known
 * flow type names. This method doesn't check whether the found type is actually
 * existing. It simply assumes that a match is always valid.
 *
 * If there is no match, "unknown" is returned.
 */
function getFlowType(path) {
  var node = path.node;
  var type = void 0;

  if (types.Type.check(node)) {
    if (node.type in flowTypes) {
      type = { name: flowTypes[node.type] };
    } else if (node.type in flowLiteralTypes) {
      type = { name: 'literal', value: node.raw || `${node.value}` };
    } else if (node.type in namedTypes) {
      type = namedTypes[node.type](path);
    }
  }

  if (!type) {
    type = { name: 'unknown' };
  }

  return type;
}