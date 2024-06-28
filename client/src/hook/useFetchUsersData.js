import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../redux/user/userSlice";

const useFetchUsersData = (endpoint) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers(endpoint));
    }, [dispatch, endpoint]);
}

export default useFetchUsersData
