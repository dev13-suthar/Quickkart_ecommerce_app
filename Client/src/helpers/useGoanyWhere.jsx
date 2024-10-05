import {useNavigate} from "react-router-dom";
const useGoanyWhere = (to) => {
    const navigate = useNavigate();

    const goANywhere = ()=>{
        navigate(`/${to}`)
    }
  return goANywhere;
}

export default useGoanyWhere


