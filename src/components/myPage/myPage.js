import React, { useState, useEffect, useCallback } from 'react'

import axios from 'axios'

import { useCookies } from 'react-cookie'

import { useHistory } from 'react-router-dom'

import RegisterModal from './registerModal'

import * as S from './styles'

const MyPage = () => {
    const [infor, setInfor] = useState([])
    const [Acookie] = useCookies(['access-token'])
    const history = useHistory()
    const [modal,modalOn] = useState(false);
    
    // 마이페이지 토큰 없으면 접근 불가....
     useEffect(() => { 
/*         if(!Acookie['access-token']) {
            history.push('/')
        } */

        axios({
            method: 'get',
            url: '/myservice',
            headers: {
                'access-token': `Bearer ${Acookie['access-token']}`
            }
        })
        .then(res => {
            console.log(res)
            setInfor(res.data)
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [])

/*     if(infor.length === 0) return <></> */
    const ModalOn = ()=>{
        modalOn(!modal);
    }

    return (
        <>
        <RegisterModal 
            style={modal} 
            setModalOn={ModalOn}
        />
        <S.Wrapper>
            <S.MyContainer>
                <S.UserName>김팔복<b>1320</b></S.UserName>
                <S.UserEmail>jidole041214@naver.com</S.UserEmail>
                <S.UserApp>
                    내가 등록한 애플리케이션
                    <S.AddApp
                        onClick={ModalOn}
                    >+</S.AddApp>
                </S.UserApp>
                <S.NoneApp>아직 등록된 애플리케이션이 없습니다!</S.NoneApp>
            </S.MyContainer>
        </S.Wrapper>
        </>
    )
}

export default MyPage