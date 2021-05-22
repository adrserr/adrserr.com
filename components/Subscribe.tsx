import axios, { AxiosError } from 'axios'
import { SyntheticEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Locale } from '../types'
import { Loading } from './Loading'
import { Message } from './Message'

interface FormState {
  state: 'loading' | 'error' | 'success'
  message?: string
}

interface SubscribeProps {
  locale: Locale
}

export const Subscribe = ({ locale }: SubscribeProps) => {
  const { t } = useTranslation('common')
  const [formState, setFormState] = useState<FormState | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  const onSubscribe = (event: SyntheticEvent) => {
    setFormState({ state: 'loading' })
    event.preventDefault()

    axios
      .post('/api/subscribe', {
        email: emailRef?.current?.value,
        locale
      })
      .then(() => {
        setFormState({ state: 'success' })
      })
      .catch((error: AxiosError<{ error: string }>) => {
        setFormState({
          state: 'error',
          message: error.response?.data.error
            .toLocaleLowerCase()
            .includes('already subscribed')
            ? t('subscribe.alreadySubscribe')
            : error.message
        })
      })
  }

  return (
    <div className="flex flex-col p-6 my-4 border rounded w-full bg-blue-50 dark:bg-gray-900">
      <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
        {t('subscribe.title')}
      </h1>
      <p className="my-1 text-gray-800 dark:text-gray-200">
        {t('subscribe.description')}
      </p>
      <form className="flex flex-col sm:flex-row my-2" onSubmit={onSubscribe}>
        <input
          ref={emailRef}
          aria-label="Email"
          placeholder="Email"
          type="email"
          autoComplete="email"
          required
          className="px-4 py-2 my-1 sm:mr-3 focus:ring-blue-500 focus:border-blue-500 h-8 w-full sm:w-3/4 border-gray-300 rounded-md bg-white  dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <button
          className="flex items-center justify-center px-4 mt-1 font-bold h-8 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28 sm:w-1/4"
          type="submit"
        >
          {formState?.state === 'loading' ? (
            <Loading />
          ) : (
            t('subscribe.subscribe')
          )}
        </button>
      </form>
      {formState?.state === 'error' && (
        <Message type="error">{formState.message || 'Error'}</Message>
      )}
      {formState?.state === 'success' && (
        <Message type="success">{t('subscribe.success')}</Message>
      )}
    </div>
  )
}
