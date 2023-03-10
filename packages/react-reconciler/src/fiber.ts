import type { Key, Props, Ref } from 'shared/ReactTypes'
import type { Flags } from './fiberFlags'
import { NoFlags } from './fiberFlags'
import type { WorkTag } from './workTags'
export class FiberNode {
  tag: number
  key: Key
  stateNode: any
  type: any
  ref: Ref
  flags: Flags
  return: FiberNode | null
  sibling: FiberNode | null
  child: FiberNode | null
  alternate: FiberNode | null
  pendingProps: Props
  memorizedProps: Props | null
  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    this.tag = tag
    this.key = key
    this.stateNode = null
    this.type = null
    this.ref = null
    this.return = null
    this.sibling = null
    this.child = null
    this.alternate = null

    this.pendingProps = pendingProps
    this.memorizedProps = null

    this.flags = NoFlags
  }
}
