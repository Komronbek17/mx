import { isNotUndefinedNullEmptyZero, isObject } from "./inspect.util";

// --- Static ---

export const assign = (...args) => Object.assign(...args);
export const create = (proto, optionalProps) =>
  Object.create(proto, optionalProps);
export const defineProperties = (obj, props) =>
  Object.defineProperties(obj, props);
export const defineProperty = (obj, prop, descriptor) =>
  Object.defineProperty(obj, prop, descriptor);
export const freeze = (obj) => Object.freeze(obj);
export const getOwnPropertyNames = (obj) => Object.getOwnPropertyNames(obj);
export const getOwnPropertyDescriptor = (obj, prop) =>
  Object.getOwnPropertyDescriptor(obj, prop);
export const getOwnPropertySymbols = (obj) => Object.getOwnPropertySymbols(obj);
export const getPrototypeOf = (obj) => Object.getPrototypeOf(obj);
export const is = (value1, value2) => Object.is(value1, value2);
export const isFrozen = (obj) => Object.isFrozen(obj);
export const keys = (obj) => Object.keys(obj);

export const entries = (obj) => Object.entries(obj);

// --- "Instance" ---

export const hasOwnProperty = (obj, prop) =>
  Object.prototype.hasOwnProperty.call(obj, prop);
export const toString = (obj) => Object.prototype.toString.call(obj);

// --- Utilities ---

// Shallow copy an object
export const clone = (obj) => ({ ...obj });

// Return a shallow copy of object with the specified properties only
// See: https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
export const pick = (obj, props) =>
  keys(obj)
    .filter((key) => props.indexOf(key) !== -1)
    .reduce((result, key) => ({ ...result, [key]: obj[key] }), {});

// Return a shallow copy of object with the specified properties omitted
// See: https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
export const omit = (obj, props) =>
  keys(obj)
    .filter((key) => props.indexOf(key) === -1)
    .reduce((result, key) => ({ ...result, [key]: obj[key] }), {});

// Merges two object deeply together
// See: https://gist.github.com/Salakar/1d7137de9cb8b704e48a
export const mergeDeep = (target, source) => {
  if (isObject(target) && isObject(source)) {
    keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!target[key] || !isObject(target[key])) {
          target[key] = source[key];
        }
        mergeDeep(target[key], source[key]);
      } else {
        assign(target, { [key]: source[key] });
      }
    });
  }
  return target;
};

// Returns a shallow copy of the object with keys in sorted order
export const sortKeys = (obj) =>
  keys(obj)
    .sort()
    .reduce((result, key) => ({ ...result, [key]: obj[key] }), {});

// Convenience method to create a read-only descriptor
export const readonlyDescriptor = () => ({
  enumerable: true,
  configurable: false,
  writable: false,
});

export const objectHasChild = (obj) => {
  if (isObject(obj)) {
    return Object.keys(obj).length > 0;
  }
  return false;
};

export const objNotEmptyNullUndefined = (o) =>
  isNotUndefinedNullEmptyZero(o) && objectHasChild(o);
