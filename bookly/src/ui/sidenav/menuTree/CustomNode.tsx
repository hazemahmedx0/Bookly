import React, { useState } from 'react'
import { NodeModel, useDragOver } from '@minoru/react-dnd-treeview'
import { CustomData } from '../../../models/SidenavTypes'
import { TypeIcon } from './TypeIcon'
import styles from './CustomNode.module.css'
import {
    ArrowRight,
    ArrowRightCircle,
    CheckCheckIcon,
    DoorClosed,
    Edit,
} from 'lucide-react'

type Props = {
    node: NodeModel<CustomData>
    depth: number
    isOpen: boolean
    isSelected: boolean
    onToggle: (id: NodeModel['id']) => void
    onSelect: (node: NodeModel) => void
    onTextChange: (id: NodeModel['id'], value: string) => void
}

export const CustomNode: React.FC<Props> = (props) => {
    const { id, text } = props.node
    const [visibleInput, setVisibleInput] = useState(false)
    const [labelText, setLabelText] = useState(text)

    const { droppable, data } = props.node
    const indent = props.depth * 24

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation()
        props.onToggle(props.node.id)
    }

    const handleShowInput = () => {
        setVisibleInput(true)
    }

    const handleCancel = () => {
        setLabelText(text)
        setVisibleInput(false)
    }

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabelText(e.target.value)
    }

    const handleSubmit = () => {
        setVisibleInput(false)
        props.onTextChange(id, labelText)
    }

    const dragOverProps = useDragOver(id, props.isOpen, props.onToggle)

    const handleSelect = () => props.onSelect(props.node)

    return (
        <div
            className={`tree-node ${styles.root} ${
                props.isSelected ? styles.isSelected : ''
            }`}
            style={{ paddingInlineStart: indent }}
            {...dragOverProps}
            onClick={handleSelect}
        >
            <div
                className={`${styles.expandIconWrapper} ${
                    props.isOpen ? styles.isOpen : ''
                }`}
            >
                {props.node.droppable && (
                    <div onClick={handleToggle}>
                        <ArrowRightCircle />
                    </div>
                )}
            </div>
            <div className={styles.labelGridItem}>
                {visibleInput ? (
                    <div className={styles.inputWrapper}>
                        <input
                            className={`${styles.textField}
              ${styles.nodeInput}`}
                            value={labelText}
                            onChange={handleChangeText}
                        />
                        <div
                            className={styles.editButton}
                            onClick={handleSubmit}
                            //   disabled={labelText === ""}
                        >
                            <CheckCheckIcon className={styles.editIcon} />
                        </div>
                        <div
                            className={styles.editButton}
                            onClick={handleCancel}
                        >
                            <DoorClosed className={styles.editIcon} />
                        </div>
                    </div>
                ) : (
                    <div className={styles.inputWrapper}>
                        <div>
                            <TypeIcon
                                droppable={droppable}
                                fileType={data?.fileType}
                            />
                        </div>
                        <p className={styles.nodeLabel}>{props.node.text}</p>
                        <div
                            className={styles.editButton}
                            onClick={handleShowInput}
                        >
                            <Edit className={styles.editIcon} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
