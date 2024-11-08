function getSearchParams(searchParams){
    const topic = searchParams.get("topic")
    const sort_by = searchParams.get("sort_by")
    const order = searchParams.get("order")
    const limit = searchParams.get("limit")
    const p = searchParams.get("p")
    return {topic, sort_by, order, limit, p}
}

export default getSearchParams