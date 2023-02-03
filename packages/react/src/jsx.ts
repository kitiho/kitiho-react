// ReactElement
import { REACT_ELEMENT_TYPE } from '@kitiho-react/shared/ReactSymbols'
import type { ElementType, IReactElement, Key, Props, Ref } from '@kitiho-react/shared/ReactTypes'

export const ReactElement = function (type: ElementType, key: Key, ref: Ref, props: Props): IReactElement {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    key,
    ref,
    props,
    type,
    __mark: 'kitiho',
  }
  return element
}
export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
  const props: Props = null
  let key: Key = null
  let ref: Ref = null

  for (const prop in config) {
    const val = config[prop]
    if (prop === 'key') {
      if (val !== undefined)
        key = `${val}`
      continue
    }

    if (prop === 'ref') {
      if (val !== undefined)
        ref = val
      continue
    }

    // 判断是不是config自己的prop 而不是原型的prop
    if (Object.prototype.hasOwnProperty.call(config, prop))
      props[prop] = val
  }

  const maybeChildrenLength = maybeChildren.length
  if (maybeChildrenLength) {
    if (maybeChildrenLength === 1)
      props.children = maybeChildrenLength[0]
    else
      props.children = maybeChildrenLength
  }

  return ReactElement(type, key, ref, props)
}

export const jsxDEV = jsx
