import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import {
    Tree,
    NodeModel,
    DragLayerMonitorProps,
    MultiBackend,
    getBackendOptions,
} from '@minoru/react-dnd-treeview'
import { CustomData } from '../../../models/SidenavTypes'
import { CustomNode } from './CustomNode'
import { CustomDragPreview } from './CustomDragPreview'
import styles from './App.module.css'
import SampleData from './sample_data.json'
import { Placeholder } from './Placeholder'

import { useMenuTree } from '../../../hooks/useMenuTree'

import { menuTreeRefactor } from '../../../lib/utils'
import { useLocation } from 'react-router-dom'

export default function NavCollecetionsMenu() {
    const { isLoading, treeMenu } = useMenuTree()
    console.log(treeMenu)
    console.log(isLoading)
    const x = menuTreeRefactor(treeMenu)
    const [treeData, setTreeData] = useState<NodeModel[]>(x || [])

    console.log(x)
    console.log(treeData)

    useEffect(() => {
        setTreeData(menuTreeRefactor(treeMenu) || [])
    }, [treeMenu])
    const location = useLocation()
    const hasMePath = location.pathname.includes('/me')
    console.log('sddd', hasMePath)
    const handleDrop = (newTree: NodeModel[]) => setTreeData(newTree)
    const [selectedNode, setSelectedNode] = useState<NodeModel>(null)

    useEffect(() => {
        if (hasMePath === false) setSelectedNode(null)
    }, [hasMePath, treeData])
    const handleSelect = (node: NodeModel) => setSelectedNode(node)

    const handleTextChange = (id: NodeModel['id'], value: string) => {
        const newTree = treeData.map((node) => {
            if (node.id === id) {
                return {
                    ...node,
                    text: value,
                }
            }

            return node
        })

        setTreeData(newTree)
    }

    if (isLoading) return <div>Loading...</div>
    return (
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <div className={styles.app}>
                <Tree
                    tree={treeData}
                    rootId={0}
                    render={(
                        node: NodeModel<CustomData>,
                        { depth, isOpen, onToggle }
                    ) => (
                        <CustomNode
                            node={node}
                            depth={depth}
                            isOpen={isOpen}
                            isSelected={node.id === selectedNode?.id}
                            onToggle={onToggle}
                            onSelect={handleSelect}
                            onTextChange={handleTextChange}
                        />
                    )}
                    dragPreviewRender={(
                        monitorProps: DragLayerMonitorProps<CustomData>
                    ) => <CustomDragPreview monitorProps={monitorProps} />}
                    onDrop={handleDrop}
                    classes={{
                        root: styles.treeRoot,
                        draggingSource: styles.draggingSource,
                        dropTarget: styles.dropTarget,
                        placeholder: styles.placeholderContainer,
                    }}
                    sort={false}
                    insertDroppableFirst={false}
                    canDrop={(
                        tree,
                        { dragSource, dropTargetId, dropTarget }
                    ) => {
                        if (dragSource?.parent === dropTargetId) {
                            return true
                        }
                    }}
                    dropTargetOffset={10}
                    placeholderRender={(node, { depth }) => (
                        <Placeholder node={node} depth={depth} />
                    )}
                />
            </div>
        </DndProvider>
    )
}
