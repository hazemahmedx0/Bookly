import { useParams } from 'react-router-dom'
function Collection() {
    const { collectionId } = useParams()
    return <div>{collectionId}</div>
}

export default Collection
