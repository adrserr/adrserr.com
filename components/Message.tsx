interface MessageProps {
  children: string | number | JSX.Element
  type: 'error' | 'success'
}
export const Message = (props: MessageProps) => {
  const { children, type } = props
  return (
    <p
      className={`inline-flex items-center text-xs font-bold ${
        type === 'error' ? 'text-rose-500' : 'text-spotify-green'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {type === 'error' ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        )}
      </svg>
      {children}
    </p>
  )
}
