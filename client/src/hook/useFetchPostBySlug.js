import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPostBySlug } from "../redux/posts/postsSlice";

const useFetchPostsBySlug = (slug) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPostBySlug(slug))
    }, [dispatch, slug])
}
export default useFetchPostsBySlug;