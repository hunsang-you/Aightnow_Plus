'use client';
import { useCallback, useEffect, useState } from 'react';
import Wrapper from '@/components/shared/Wrapper';
import AuthPopup from '@/components/signup/Popup';
import { useTranslations } from 'next-intl';
import LoadingSpinnerWrapper from '@/components/shared/LoadingSpinnerWrapper';
import usePopupStore from '@/store/userPopup';
import AutoLoginAndLinks from '@/components/login/AutoLoginAndLinks';
import SignupLink from '@/components/login/SignupLink';
import SocialLoginButtons from '@/components/login/SocialLoginButtons';
import { conceptMap } from '../shared/input/inputConfig';
import useInputChange from '@/hooks/input/useInputChange';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import InputSet from '../shared/input';
import TextButton from '../shared/buttons/TextButton';

export default function Login() {
  const { isShowPopup, popupMsg, hidePopup } = usePopupStore();
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const t = useTranslations('Login');
  const { showPopup } = usePopupStore();

  const validateForm = useCallback(() => {
    const isPasswordValid = conceptMap.password.doValidation(
      value.password,
    );
    const isLoginIdValid = conceptMap.loginId.doValidation(
      value.loginId,
    );
    setIsFormValid(isLoginIdValid && isPasswordValid);
  }, [value.loginId, value.password]);

  useEffect(() => {
    validateForm();
  }, [value, validateForm]);

  const onHandleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmit(true);
      if (!isFormValid) return;
      setIsLoading(true);
      const result = await signIn('credentials', {
        email: value.loginId, // 여기서 loginId는 userId를 의미
        password: value.password,
        redirect: false,
      });

      if (result?.error) {
        showPopup(
          t('PopupMessages.login_fail'),
          t('PopupMessages.login_fail_msg'),
        );
        setIsLoading(false);
      } else {
        router.replace('/home');
      }
    },
    [
      isFormValid,
      router,
      setIsLoading,
      showPopup,
      t,
      value.loginId,
      value.password,
    ],
  );
  return (
    <>
      {isShowPopup && (
        <AuthPopup
          onClose={hidePopup}
          error={true}
          title={popupMsg.title}
          errorMessage={popupMsg.msg}
        />
      )}
      <main className="flex justify-center items-center h-screen">
        <Wrapper padding="px-24 py-20" width="w-[590px]">
          <div className="flex flex-col w-96 h-full">
            <h3 className="h3 font-bold text-center mb-10 text-primary-900">
              {t('login')}
            </h3>
            <LoadingSpinnerWrapper isLoading={isLoading}>
              {/* 로그인 폼 */}
              <form onSubmit={onHandleSubmit}>
                <InputSet className="flex flex-col gap-4">
                  <InputSet.Validated
                    onChange={onChangeInputValue}
                    value={value.loginId}
                    type="loginId"
                    concept="loginId"
                    isSubmit={isSubmit}
                  />
                  <InputSet.Validated
                    onChange={onChangeInputValue}
                    value={value.password}
                    type="password"
                    concept="password"
                    isSubmit={isSubmit}
                  />
                  <TextButton
                    aria-label={t('login')}
                    disabled={isLoading}
                  >
                    {t('login')}
                  </TextButton>
                </InputSet>
              </form>
              {/* 자동로그인 */}
              <div className="flex flex-col mt-4 gap-y-4">
                <AutoLoginAndLinks
                  isAutoLogin={isAutoLogin}
                  setIsAutoLogin={setIsAutoLogin}
                />
                {/* 회원가입*/}
                <SignupLink />

                <div className="relative flex items-center justify-center my-2 b5">
                  <div className="absolute inset-0 flex items-center">
                    <hr className="w-full border-t border-grayscale-400" />
                  </div>
                  {/* <div className="relative bg-grayscale-0 px-2 text-grayscale-600">
                    {t('or')}
                  </div> */}
                </div>
              </div>

              {/* 소셜로그인 */}
              {/* <SocialLoginButtons setIsLoading={setIsLoading} /> */}
            </LoadingSpinnerWrapper>
          </div>
        </Wrapper>
      </main>
    </>
  );
}
