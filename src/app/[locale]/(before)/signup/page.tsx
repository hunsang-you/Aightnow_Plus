'use client';
import React, { useEffect } from 'react';
import Agreement from '@/components/signup/Agreement';
import Auth from '@/components/signup/Auth';
import SignupForm from '@/components/signup/SignupForm';
import ProfileSetup from '@/components/signup/ProfileSetup';
import Welcome from '@/components/signup/Welcome';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import useUserStore from '@/store/userStore';
import usePageStore from '@/store/signupStepStore';

const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string;
// 페이지 스텝 타입 정의
export type PageStep =
  | 'agreement'
  | 'auth'
  | 'signupForm'
  | 'profile'
  | 'welcome';

export default function Signup() {
  const { clearUser, setUser, user } = useUserStore();
  const { pageStep, setPageStep } = usePageStore();

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    //route 인증링크 전송 시  route에서 쿠키에 저장한 auth-token
    // 인증링크를 통해 params로 들어온 token을 비교
    const token = Cookies.get('auth-token') || '';
    const paramsToken = searchParams.get('token');
    const social = searchParams.get('social') === 'true';
    if (token === paramsToken || (social && paramsToken)) {
      try {
        // token과 secret 값을 비교
        // 소셜 회원가입이라면
        //  socail 값과 paramsToken 값을 확인
        if (social) {
          const { name, email, id, image, providerAccountId } =
            jwt.verify(paramsToken, secret) as {
              name: string;
              email: string;
              id?: string;
              image?: string;
              providerAccountId?: string;
            };
          setUser({
            name,
            email,
            password: id,
            userId: id,
            profileImg: image,
            providerAccountId,
          });
        } else {
          const { name, email } = jwt.verify(token, secret) as {
            name: string;
            email: string;
          };
          setUser({ name, email });
        }
        setPageStep('signupForm');
      } catch (e) {
        router.push('/signup'); // 유효하지 않은 경우 리디렉션
        clearUser();
      }
    } else {
      setPageStep('agreement');
    }
  }, [searchParams, clearUser, setUser, router, setPageStep]);

  const mainMarginClass = pageStep === 'agreement' ? 'mt-12' : '';
  return (
    <main
      className={`flex justify-center items-center ${mainMarginClass}`}
    >
      {pageStep === 'agreement' && (
        // 이용 약관
        <Agreement />
      )}
      {pageStep === 'auth' && (
        // 이메일 링크 인증
        <Auth />
      )}
      {pageStep === 'signupForm' && (
        // 회원가입
        <SignupForm />
      )}
      {pageStep === 'profile' && (
        // 프로필 설정
        <ProfileSetup />
      )}
      {pageStep === 'welcome' && <Welcome />}
    </main>
  );
}
