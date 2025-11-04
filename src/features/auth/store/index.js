import { useAppDispatch, useAppSelector } from "../../../app/store/hooks"



const dispatch = useAppDispatch()
const user = useAppSelector(state => state.auth.user)