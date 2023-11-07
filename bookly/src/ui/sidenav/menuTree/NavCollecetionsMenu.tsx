import { useState } from 'react'
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

export default function NavCollecetionsMenu() {
    const [treeData, setTreeData] = useState<NodeModel[]>(SampleData)
    const handleDrop = (newTree: NodeModel[]) => setTreeData(newTree)
    const [selectedNode, setSelectedNode] = useState<NodeModel>(null)
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
    return (
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <div className={styles.app}>
                <div className={styles.current}>
                    <p>
                        Current node:{' '}
                        <span className={styles.currentLabel}>
                            {selectedNode ? selectedNode.text : 'none'}
                        </span>
                    </p>
                </div>
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
                        draggingSource: styles.draggingSource,
                        dropTarget: styles.dropTarget,
                    }}
                />
            </div>
        </DndProvider>
    )
}
