import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterPosts } from "../redux/posts/postsSlice";

const useFetchPostsByQuery = (endpoint) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(filterPosts(endpoint))
    }, [dispatch, endpoint])
}
export default useFetchPostsByQuery;