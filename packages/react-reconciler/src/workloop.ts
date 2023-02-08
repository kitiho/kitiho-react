import { beginWork } from './beginWork'
import { completeWork } from './completeWork'
import type { FiberNode } from './fiber'

let workInProgress: FiberNode | null = null

function prepareFreshStack(fiber: FiberNode) {
  workInProgress = fiber
}

export const renderRoot = (root: FiberNode) => {
  // 初始化
  prepareFreshStack(root)
  do {
    try {
      workLoop()
      break
    }
    catch (error) {
      console.warn('workloop发生错误', error)
      workInProgress = null
    }
  } while (true)
}
function workLoop() {
  while (workInProgress !== null)
    performUnitOfWork(workInProgress)
}

function performUnitOfWork(fiber: FiberNode) {
  const next = beginWork(fiber)
  fiber.memorizedProps = fiber.pendingProps
  if (next === null)
    completeUnitOfWork(fiber)

  else
    workInProgress = next
}

function completeUnitOfWork(fiber: FiberNode) {
  let node: FiberNode | null = fiber
  do {
    completeWork(node)
    const sibling = node.sibling
    if (sibling !== null) {
      workInProgress = sibling
      return
    }
    else {
      node = node.return
      workInProgress = null
    }
  } while (node !== null)
}
