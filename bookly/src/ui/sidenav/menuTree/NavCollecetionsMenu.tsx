import { useEffect, useState } from 'react'
// Dnd and tree view imports
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
import { Placeholder } from './Placeholder'
import styles from './App.module.css'

//////////////////////////

// Toast
import { toast } from 'sonner'

// React rounter dom
import { useLocation, useParams } from 'react-router-dom'

// React query
import { useQueryClient } from '@tanstack/react-query'

// Loading skeleton
import TreeMenuLoading from '../../loadingSkeletons/TreeMenuLoading'

// API
import menuApi from '../../../api/modules/menu.api'

// Hooks
import { useMenuTree } from '../../../hooks/useMenuTree'

// Utils
import { menuTreeRefactor, getParentChain } from '../../../lib/utils'

// Icons
import { ChevronDown } from 'lucide-react'

// Context
import { useAuth } from '../../../context/auth'

// Components
import TreeMenuEmpty from '../../../components/empty-states/TreeMenuEmpty'

export default function NavCollecetionsMenu() {
    const { auth, setAuth } = useAuth()

    const queryClient = useQueryClient()

    // Tree menu states
    const [treeOpen, setTreeOpend] = useState(true)
    const { isLoading, treeMenu } = useMenuTree()
    const treeMenuRefactord = menuTreeRefactor(
        treeMenu,
        auth?.user?.baseDirectoryId
    )
    const [treeData, setTreeData] = useState<NodeModel[]>(
        treeMenuRefactord || []
    )

    // To update tree menu when treeMenu state changes
    useEffect(() => {
        setTreeData(
            menuTreeRefactor(treeMenu, auth?.user?.baseDirectoryId) || []
        )
    }, [treeMenu, auth])

    // To clear or update selected node state when location changes
    const [selectedNode, setSelectedNode] = useState<NodeModel>(null)
    const location = useLocation()
    const hasMePath = location.pathname.includes('/me')
    const { collectionId } = useParams()
    const handleSelect = (node: NodeModel) => setSelectedNode(node)

    // To update collection chain when collectionId changes or user vistid the collection page directly
    const [collectionChain, setCollectionChain] = useState<number[]>([])
    useEffect(() => {
        if (treeData && collectionId) {
            const tempChain: number[] = getParentChain(
                Number(collectionId),
                treeData
            )
            setCollectionChain(tempChain)
        }
    }, [])

    // To update selected node state and style when user vistid the collection page directly
    useEffect(() => {
        const currentNode = treeData?.find(
            (item) => item.id === Number(collectionId)
        )
        if (currentNode) setSelectedNode(currentNode)
        if (hasMePath === false) setSelectedNode(null)
    }, [hasMePath, treeData, collectionId])

    // Handle drop event when drag and drop node in tree menu
    const handleDrop = async (
        newTree: NodeModel[],
        {
            dragSourceId,
            dropTargetId,
            dragSource,
            dropTarget,
        }: {
            dragSourceId: number
            dropTargetId: number
            dragSource: NodeModel
            dropTarget: NodeModel
        }
    ) => {
        // Save old tree
        const tempNode: NodeModel[] = treeData
        // Update tree temporary for UI
        setTreeData(newTree)
        const { response, err } = await menuApi.updateDir({
            id: dragSource.id,
            icon: 'default',
            name: dragSource.text,
            parentId: dropTargetId,
        })
        // If error, rollback tree
        if (err) {
            setTreeData(tempNode)
            return
        }
        queryClient.invalidateQueries({ queryKey: ['treeMenu'] })
    }

    const handleTextChange = async (
        id: NodeModel['id'],
        value: string,
        parentId: NodeModel['parent']
    ) => {
        const updateNodeName = async () => {
            const { response, err } = await menuApi.updateDir({
                id,
                icon: 'default',
                name: value,
                parentId,
            })
            if (err) {
                toast.error('Error')
            } else {
                toast.success(`Your changes have been saved`)
            }
        }

        toast.promise(updateNodeName, {
            loading: 'Loading...',
        })

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

    if (isLoading) return <TreeMenuLoading />
    return (
        <>
            <p className="text-zinc-800 pl-2 text-label-small flex justify-between items-center">
                <span>Collections</span>{' '}
                <ChevronDown
                    className={`text-zinc-600 ${!treeOpen ? 'rotate-90' : ''}`}
                    size={16}
                    onClick={() => setTreeOpend(!treeOpen)}
                />
            </p>
            {treeOpen && treeData.length === 0 ? ( // If tree menu is open and tree data is empty
                <TreeMenuEmpty />
            ) : null}

            {treeOpen && treeData.length !== 0 ? (
                <DndProvider
                    backend={MultiBackend}
                    options={getBackendOptions()}
                >
                    <div className={styles.app}>
                        <Tree
                            tree={treeData}
                            rootId={auth?.user?.baseDirectoryId || 0}
                            render={(
                                node: NodeModel<CustomData>,
                                { depth, isOpen, onToggle, hasChild }
                            ) => (
                                <CustomNode
                                    node={node}
                                    depth={depth}
                                    isOpen={isOpen}
                                    isSelected={node.id === selectedNode?.id}
                                    onToggle={onToggle}
                                    onSelect={handleSelect}
                                    onTextChange={handleTextChange}
                                    hasChild={hasChild}
                                />
                            )}
                            dragPreviewRender={(
                                monitorProps: DragLayerMonitorProps<CustomData>
                            ) => (
                                <CustomDragPreview
                                    monitorProps={monitorProps}
                                />
                            )}
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
                            initialOpen={collectionChain}
                        />
                    </div>
                </DndProvider>
            ) : null}
        </>
    )
}
