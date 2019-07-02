import axios from "axios";

export const zipRequestDispatch = (zipcode) => {
    return (dispatch) => {
        axios({
            method: 'post',
            // url: 'https://www.zipcodeapi.com/rest/smSkfHWKkUriOnIvrOfvpwrXKktOzw0r7Zrt3rOGZwTLUmMMyJjdux1FZhpcc3iA/radius.json/' + zipcode + '/5/km',
            url: 'http://localhost:8282/curl/?zipcode='+zipcode,
            // data: { zipcode: 'bar' },

        }).then((res) => {
            dispatch({type:'SET', res: res.data})
        }).catch(err => {
            console.error(err)
        })
    }
}
