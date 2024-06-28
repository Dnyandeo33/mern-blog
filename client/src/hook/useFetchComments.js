import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllComments } from "../redux/comments/commentsSlice";

const useFetchComments = (endpoint) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllComments(endpoint));
    }, [dispatch, endpoint])
}
export default useFetchComments;

