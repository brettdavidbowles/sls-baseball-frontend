interface ChevronProps {
  classes?: string
}

const Chevron = (props: ChevronProps) => (
  <div className={props.classes}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={26.002}
      height={45.999}
      className="h-full w-full"
      viewBox="0 0 26.002 45.999"
    >
      <path
        fill="currentColor"
        d="M24.998 40.094a3.484 3.484 0 0 1 0 4.893 3.404 3.404 0 0 1-4.846 0L1.004 25.447a3.486 3.486 0 0 1 0-4.895L20.152 1.014a3.402 3.402 0 0 1 4.846 0 3.484 3.484 0 0 1 0 4.893L9.295 23l15.703 17.094z"
      />
    </svg>
  </div>
)

export default Chevron