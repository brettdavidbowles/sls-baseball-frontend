interface Props {
  showSlider: boolean
}

export default function Slider(props: Props) {
  return (
    <div className='relative'>
      <div className={`fixed z-50 min-h-screen right-0 transition-all duration-500 bg-green-700 ${props.showSlider ? 'w-64' : 'w-0'}`} />
    </div>
  )
}