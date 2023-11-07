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
import { Placeholder } from './Placeholder'

import { useMenuTree } from '../../../hooks/useMenuTree'

import { menuTreeRefactor } from '../../../lib/utils'
import { useLocation } from 'react-router-dom'

import menuApi from '../../../api/modules/menu.api'

import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function NavCollecetionsMenu() {
    const queryClient = useQueryClient()

    const { isLoading, treeMenu } = useMenuTree()
    const x = menuTreeRefactor(treeMenu)
    const [treeData, setTreeData] = useState<NodeModel[]>(x || [])

    useEffect(() => {
        setTreeData(menuTreeRefactor(treeMenu) || [])
    }, [treeMenu])
    const location = useLocation()
    const hasMePath = location.pathname.includes('/me')

    const handleDrop = async (
        newTree: NodeModel[],
        { dragSourceId, dropTargetId, dragSource, dropTarget }
    ) => {
        const { response, err } = await menuApi.updateDir({
            id: dragSource.id,
            icon: 'default',
            name: dragSource.text,
            parentId: dropTargetId,
        })

        console.log('responseresponse', response)
        console.log('errerr', err)
        console.log('dragSource', dragSource)
        console.log('dragSourceId', dragSourceId)
        console.log('dropTargetId', dropTargetId)
        queryClient.invalidateQueries({ queryKey: ['treeMenu'] })

        return setTreeData(newTree)
    }
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

    const onDragEndHandler = (x) => {
        console.log('source', x)
    }

    if (isLoading) return <div>Loading...</div>
    return (
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <div className={styles.app}>
                <Tree
                    onDragEnd={onDragEndHandler}
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
