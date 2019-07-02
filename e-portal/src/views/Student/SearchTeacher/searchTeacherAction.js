import axios from "axios";
import { getTeachersFromDBBasedOnCategory } from '../../../database/dal/firebase/studentDal';


export const getTeachersBasedOnCateogy = (selectedSubject) => {
    return (dispatch) => {
        getTeachersFromDBBasedOnCategory(dispatch,selectedSubject);
    }
}


export const zipRequestDispatch = (zipcode) => {
    return (dispatch) => {
        axios({
            // url: 'https://www.zipcodeapi.com/rest/smSkfHWKkUriOnIvrOfvpwrXKktOzw0r7Zrt3rOGZwTLUmMMyJjdux1FZhpcc3iA/radius.json/' + zipcode + '/5/km',
            // url: 'http://localhost:8282/curl/?zipcode='+zipcode,
            url: 'http://mplegalfirm.com/curl/?zipcode='+zipcode,
        }).then((res) => {
            dispatch({type:'SET', res: res.data})
        }).catch(err => {
            console.error(err)
        })
    }
}