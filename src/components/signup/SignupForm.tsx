'use client';
import React, { useState } from 'react';
import InputSet from '@/components/shared/input/index';
import useInputChange from '@/hooks/input/useInputChange';
import TextButton from '@/components/shared/buttons/TextButton';
import Wrapper from '@/components/shared/Wrapper';
import { CheckForDuplicate } from '../shared/input/InputDuplicateCheck';

import { conceptMap } from '@/components/shared/input/inputConfig';
import { PageStep } from '@/app/(before)/signup/page';
import { register } from '@/lib/action';

type SignupFormProps = {
  handleSubmit: (nextPage: PageStep) => void;
};

export default function SignupForm({
  handleSubmit,
}: SignupFormProps) {
  const { value, onChangeInputValue } = useInputChange();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [duplicatedCheck, setDuplicatedCheck] = useState(false);

  const handleDuplicate = async () => {
    const response = await fetch(
      `/api/user?signupId=${value.signupId}`,
    );
    const result = await response.json();
    console.log('result', result);
    if (result.message === 'duplicate') {
      setDuplicatedCheck(false);
      return 'duplicate';
    } else {
      setDuplicatedCheck(true);
      return 'possible';
    }
  };

  const validateForm = () => {
    const isSignupIdValid = duplicatedCheck;
    const isPasswordValid = conceptMap.password.doValidation(
      value.password,
    );
    const isPasswordCheckValid =
      value.password === value.passwordCheck;
    const isSignupPhoneValid = conceptMap.signupPhone.doValidation(
      value.signupPhone,
    );
    const isBirthValid = conceptMap.birth.doValidation(value.birth);
    console.log(
      'isSignupIdValid: ',
      isSignupIdValid,
      'isPasswordValid: ',
      isPasswordValid,
      'isPasswordCheckValid: ',
      isPasswordCheckValid,
      'isSignupPhoneValid: ',
      isSignupPhoneValid,
      'isBirthValid: ',
      isBirthValid,
    );
    setIsFormValid(
      isSignupIdValid &&
        isPasswordValid &&
        isPasswordCheckValid &&
        isSignupPhoneValid &&
        isBirthValid,
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChangeInputValue(e);
    validateForm();
  };

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);

    if (!isFormValid) return console.log('isFormValid unset');
    setIsFormValid(false);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const response = await fetch('/api/email', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      handleSubmit('profile');
    } else {
      console.error('회원가입 실패:', await response.json());
    }
  };
  return (
    <Wrapper padding="px-24 py-20" width="w-[590px]">
      <div className="flex flex-col justify-start w-[386px] h-full">
        <h3 className="h3 font-bold text-center mb-10 text-primary-900">
          회원가입
        </h3>
        <form onSubmit={onHandleSubmit}>
          <InputSet className="flex flex-col gap-4">
            <InputSet.DuplicateCheck
              onChange={onChangeInputValue}
              onClick={handleDuplicate}
              value={value.signupId}
              type="text"
              concept="signupId"
              isSubmit={isSubmit}
            />
            <InputSet.Validated
              onChange={handleInputChange}
              value={value.password}
              type="text"
              concept="password"
              isSubmit={isSubmit}
            />
            <InputSet.Validated
              onChange={handleInputChange}
              value={value.passwordCheck}
              password={value.password}
              type="text"
              concept="passwordCheck"
              isSubmit={isSubmit}
            />
            <InputSet.Validated
              onChange={handleInputChange}
              value={value.signupPhone}
              type="text"
              concept="signupPhone"
              isSubmit={isSubmit}
            />
            <InputSet.Validated
              onChange={handleInputChange}
              value={value.birth}
              type="text"
              concept="birth"
              isSubmit={isSubmit}
            />

            <TextButton
              // disabled={!isFormValid}
              // onClick={onHandleSubmit}
              className="w-full mx-auto mt-8"
            >
              다음
            </TextButton>
          </InputSet>
        </form>
      </div>
    </Wrapper>
  );
}
