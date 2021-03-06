import * as S from './styles'

import {useCookies} from 'react-cookie'

import {useHistory} from 'react-router-dom'

import axios from 'axios'

import React,{useEffect, useState} from 'react'

const RegisterModal = ({style,setModalOn}) => {
    const history = useHistory()

    const [Acookie] = useCookies(['access-token'])

    const [AppValue,setValue] = useState({
        name:"",
        domain:"",
        url:""
    });

    const [modal,setModal] = useState(style);
    useEffect(()=>{
        setModal(style)
    },[style])

    const InputVal =(e)=>{
        const {name,value} = e.target
        setValue({
            ...AppValue,
            [name]:value
        })
    }

    const registerApp = () => {
        axios({
            method: 'post',
            url: '/consumer/registration',
            headers: {
                'access-token': `Bearer ${Acookie['access-token']}`
            },
            data: {
                consumer: AppValue.name,
                domain_url: AppValue.domain,
                redirect_url: AppValue.url
            }
        })
        .then(res => {
            console.log(res)
            window.location.href = "/mypage"
/*             history.replace('/api') */
        })
        .catch(err => {
            console.log(err.response)
            alert('등록에 실패했습니다.')
        })
    }

    return (
        <S.ModalWrapper
            style={
                modal?{display:"flex"}
                :modal?{display:"none"}
                :{display:"none"}
            }
        >
            <S.ModalContainer>
                <p>애플리케이션 등록</p>
                <S.ModalLine />
                <S.InputApp
                    placeholder="애플리케이션 이름을 입력하세요."
                    onChange={InputVal}
                    name="name"
                    value={AppValue.name}
                />
                <S.ModalLine />
                <S.InputApp
                    placeholder="사이트 도메인을 입력하세요."
                    onChange={InputVal}
                    name="domain"
                    value={AppValue.domain}
                />
                <S.ModalLine />
                <S.InputApp
                    placeholder="리다이렉트 url을 입력하세요."
                    onChange={InputVal}
                    name="url"
                    value={AppValue.url}
                />
                <S.ModalLine />
                <S.BtnCont>
                    <button
                        style={{border:"1px solid gray"}}
                        onClick={()=>{setModalOn()}}
                    >취소</button>
                    <button
                        style={{border:"none",backgroundColor:"#713EFF",color:"white"}}
                        onClick={registerApp}
                    >등록</button>
                </S.BtnCont>
            </S.ModalContainer>
        </S.ModalWrapper>
    )
}

export default RegisterModal;