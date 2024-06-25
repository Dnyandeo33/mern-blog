import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../redux/posts/postsSlice";

const useFetchPostsData = (endpoint) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllPosts(endpoint))
    }, [dispatch, endpoint])
}
export default useFetchPostsData;
